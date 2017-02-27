import {
  DocumentNode,
  DefinitionNode,
  OperationDefinitionNode,
  FragmentDefinitionNode,
  SelectionSetNode,
  SelectionNode,
  FieldNode,
  ArgumentNode,
  ValueNode,
  IntValueNode,
  FloatValueNode,
  StringValueNode,
  BooleanValueNode,
  NullValueNode,
  VariableNode,
  EnumValueNode,
  ListValueNode,
  ObjectValueNode,
  ObjectFieldNode,
  DirectiveNode,
  VariableDefinitionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  NamedTypeNode,
} from 'graphql';

export function gqlp(doc: string): DocumentNode {
  const tokens = tokenize(doc);

  return parse(tokens);
}

export function tokenize(doc: string): Token[] {
  let pos = 0;

  let line = 0;
  let lastNewLine = 0;

  let tokens: Token[] = [];

  function pushToken(kind: TokenKind, value: string) {
    tokens.push({
      kind,
      value,

      // In GraphQL responses these are supposed to be 1-indexed
      line: line + 1,
      col: pos - lastNewLine + 1,
    })
  }

  function skipSpaceOrComment() {
    if(
      doc.charCodeAt(pos) === 32 || // space
      doc.charCodeAt(pos) === 10 || // newline
      doc.charCodeAt(pos) === 9 || // comma
      doc.charCodeAt(pos) === 44 // tab
    ) {
      if (doc.charCodeAt(pos) === 10) { // newline
        line++;
        lastNewLine = pos;
      }

      pos++;
      return true;
    }

    if (doc.charCodeAt(pos) === 35) { // #
      while(doc.charCodeAt(pos) !== 10 && pos < doc.length) { // newline
        pos++;
      }
      return true;
    }

    return false;
  }

  // punctuator regex is /[!$():=@\[\]{}]/;
  // char codes are 33,36,40,41,58,61,64,91,93,123,125
  function tokenizePunctuator(): boolean {
    if (
      // Put the brackets at the beginning because those are more common
      doc.charCodeAt(pos) === 123 || // {
      doc.charCodeAt(pos) === 125 || // }
      doc.charCodeAt(pos) === 40 || // (
      doc.charCodeAt(pos) === 41 || // )
      doc.charCodeAt(pos) === 33 || // !
      doc.charCodeAt(pos) === 36 || // $
      doc.charCodeAt(pos) === 58 || // :
      doc.charCodeAt(pos) === 61 || // =
      doc.charCodeAt(pos) === 64 || // @
      doc.charCodeAt(pos) === 91 || // [
      doc.charCodeAt(pos) === 93 // ]
    ) {
      pushToken(TokenKind.Punctuator, doc[pos]);
      pos++;
      return true;
    } else if (doc.charCodeAt(pos) === 46) {
      if (doc.length > pos + 2 && doc[pos + 1] === '.' && doc[pos + 2] === '.') {
        pushToken(TokenKind.Punctuator, '...');
        pos += 3;
        return true;
      } else {
        throw new Error('Syntax error, expected .');
      }
    }

    return false;
  }

  function tokenizeName(): boolean {
    if (
      // /[_A-Za-z]/
      doc.charCodeAt(pos) >= 65 && doc.charCodeAt(pos) <= 90 ||
      doc.charCodeAt(pos) >= 97 && doc.charCodeAt(pos) <= 122 ||
      doc.charCodeAt(pos) === 95
    ) {
      const startPos = pos;

      // consume first char
      pos++;

      // consume rest chars
      while(
        // /[_0-9A-Za-z]/
        doc.charCodeAt(pos) >= 65 && doc.charCodeAt(pos) <= 90 ||
        doc.charCodeAt(pos) >= 97 && doc.charCodeAt(pos) <= 122 ||
        doc.charCodeAt(pos) >= 48 && doc.charCodeAt(pos) <= 57 ||
        doc.charCodeAt(pos) === 95
      ) {
        pos++;
      }

      pushToken(TokenKind.Name, doc.substring(startPos, pos));
      return true;
    }

    return false;
  }

  const numberIntPartRestChar = /[0-9]/;
  const floatConnectorChar = /[.eE]/;
  const floatRestChar = /[0-9Ee+\-]/;
  function tokenizeNumber(): boolean {
    // -?(0|[1-9][0-9]*)
    if (
      // /[\-0-9]/
      doc.charCodeAt(pos) >= 48 && doc.charCodeAt(pos) <= 57 ||
      doc.charCodeAt(pos) === 45
    ) {
      const startPos = pos;
      let isFloat = false;

      // consume first char
      pos++;

      // consume rest chars
      while(numberIntPartRestChar.test(doc[pos])) {
        pos++;
      }

      // it might be a float!
      if (floatConnectorChar.test(doc[pos])) {
        // it's a float.
        isFloat = true;
        pos++;

        // consume rest chars
        while(floatRestChar.test(doc[pos])) {
          pos++;
        }

        pushToken(TokenKind.FloatValue, doc.substring(startPos, pos));
        return true;
      }

      pushToken(TokenKind.IntValue, doc.substring(startPos, pos));
      return true;
    }

    return false;
  }

  function tokenizeString(): boolean {
    if (doc.charCodeAt(pos) === 34) { // "
      pos++;
      const startPos = pos;

      // Consume characters that aren't ", /, or line terminator
      while (pos < doc.length) {
        if (doc.charCodeAt(pos) === 34) { // "
          pushToken(
            TokenKind.StringValue,

            // Try to use JSON.parse to handle escaping, unicode, etc.
            JSON.parse('"' + doc.substring(startPos, pos) + '"'),
          );

          pos++;

          // break loop
          return true;
        }

        // This is an escaped character
        if (doc.charCodeAt(pos) === 92) { // \
          // consume slash
          pos++;

          // consume escaped character
          pos++;
        } else {
          // consume character
          pos++;
        }
      }

      // We got to the end without a terminator
      throw new Error('unterminated string literal');
    }

    return false;
  }

  function throwUnknownCharacterError() {
    throw new Error(`Unknown character ${doc[pos]} at location ${pos}`);
  }

  while (pos < doc.length) {
    skipSpaceOrComment() ||
      tokenizePunctuator() ||
      tokenizeName() ||
      tokenizeNumber() ||
      tokenizeString() ||
      throwUnknownCharacterError();
  }

  return tokens;
}

const enum TokenKind {
  Punctuator,
  Name,
  IntValue,
  FloatValue,
  StringValue,
}

type Token = {
  kind: TokenKind,
  value: string,
  line: number,
  col: number,
}

function parse(tokens: Token[]): DocumentNode {
  let pos = 0;

  function parseDefinitions(): DefinitionNode[] {
    const definitions = [];

    while (pos < tokens.length) {
      definitions.push(parseDefinition());
    }

    return definitions;
  }

  function parseDefinition(): DefinitionNode {
    const tok = consume(TokenKind.Name, true);

    let hasKeyword = false;
    let definitionType = 'query';

    if (tok) {
      definitionType = tok.value;
      hasKeyword = true;
    }

    if (
      definitionType === 'query' ||
      definitionType === 'mutation' ||
      definitionType === 'subscription'
    ) {
      const nameTok = consume(TokenKind.Name, true);

      return {
        kind: 'OperationDefinition',
        operation: definitionType,
        // TODO fix the following two after response to
        // https://github.com/graphql/graphql-js/issues/729
        name: nameTok ? { kind: 'Name', value: nameTok.value } : ( hasKeyword ? undefined : null ),
        variableDefinitions: hasKeyword ? parseVariableDefinitions() : null,
        directives: parseDirectives(),
        selectionSet: parseSelectionSet(),
      } as OperationDefinitionNode;
    }

    if (definitionType === 'fragment') {
      const nameTok = consume(TokenKind.Name, true);
      consume(TokenKind.Name, false, 'on');

      return {
        kind: 'FragmentDefinition',
        name: { kind: 'Name', value: nameTok.value },
        typeCondition: parseTypeCondition(),
        directives: parseDirectives(),
        selectionSet: parseSelectionSet(),
      } as FragmentDefinitionNode;
    }

    throw new Error('Invalid definition type: ' + definitionType);
  }

  function parseTypeCondition(): NamedTypeNode {
    const nameToken = consume(TokenKind.Name, true);

    if (! nameToken) {
      return null;
    }

    return {
      kind: 'NamedType',
      name: { kind: 'Name', value: nameToken.value },
    };
  }

  // Screw variable types
  function parseVariableDefinitions(): VariableDefinitionNode[] {
    if (consume(TokenKind.Punctuator, true, '(')) {
      while (! consume(TokenKind.Punctuator, true, ')')) {
        consume();
      }
      return [];
    }

    return [];
  }

  function parseDirectives(): DirectiveNode[] {
    const directives: DirectiveNode[] = [];
    while (!! consume(TokenKind.Punctuator, true, '@')) {
      directives.push({
        kind: 'Directive',
        name: { kind: 'Name', value: consume(TokenKind.Name).value, },
        arguments: parseArguments(),
      })
    }
    return directives;
  }

  function parseSelectionSet(optional: boolean = false): SelectionSetNode {
    const exists = !! consume(TokenKind.Punctuator, optional, '{');
    if (! exists) {
      return null;
    }

    const selections = [];
    while (! consume(TokenKind.Punctuator, true, '}')) {
      selections.push(parseSelection());
    }

    return {
      kind: 'SelectionSet',
      selections,
    };
  }

  function parseSelection(optional: boolean = false): SelectionNode {
    const isFragment = consume(TokenKind.Punctuator, true, '...');
    if (isFragment) {
      if (consume(TokenKind.Name, true, 'on') || tokens[pos].kind !== TokenKind.Name) {
        return {
          kind: 'InlineFragment',
          typeCondition: parseTypeCondition(),
          directives: parseDirectives(),
          selectionSet: parseSelectionSet(),
        } as InlineFragmentNode;
      }

      return {
        kind: 'FragmentSpread',
        name: { kind: 'Name', value: consume(TokenKind.Name).value },
        directives: parseDirectives(),
      } as FragmentSpreadNode;
    } else {
      // This is a field
      const aliasOrFieldNameTok = consume(TokenKind.Name, optional);
      if (! aliasOrFieldNameTok) {
        return null;
      }

      // Check for a colon to see if it is an alias
      const isAlias = !! consume(TokenKind.Punctuator, true, ':');
      let fieldName: string, alias: string;
      if (isAlias) {
        const fieldNameTok = consume(TokenKind.Name);
        alias = aliasOrFieldNameTok.value;
        fieldName = fieldNameTok.value;
      } else {
        fieldName = aliasOrFieldNameTok.value;
      }

      const field: FieldNode = {
        alias: alias ? { kind: 'Name', value: alias } : null,
        arguments: parseArguments(),
        directives: parseDirectives(),
        kind: 'Field',
        name: { kind: 'Name', value: fieldName },
        selectionSet: parseSelectionSet(true),
      }

      return field;
    }
  }

  function parseArguments(): ArgumentNode[] {
    const hasArguments = !! consume(TokenKind.Punctuator, true, '(');
    if (!hasArguments) {
      return [];
    }

    const args = [];
    while (! consume(TokenKind.Punctuator, true, ')')) {
      args.push(parseArgument());
    }
    return args;
  }

  function parseArgument(): ArgumentNode {
    const nameTok = consume(TokenKind.Name);
    consume(TokenKind.Punctuator, false, ':');

    return {
      kind: 'Argument',
      name: { kind: 'Name', value: nameTok.value },
      value: parseValue(),
    };
  }

  function parseValue(isConst: boolean = false): ValueNode {
    const valueTok = consume();

    if (
      valueTok.kind === TokenKind.IntValue
    ) {
      return {
        kind: 'IntValue',
        value: valueTok.value,
      } as IntValueNode;
    }

    if (
      valueTok.kind === TokenKind.FloatValue
    ) {
      return {
        kind: 'FloatValue',
        value: valueTok.value,
      } as FloatValueNode;
    }

    if (
      valueTok.kind === TokenKind.StringValue
    ) {
      return {
        kind: 'StringValue',
        value: valueTok.value,
      } as StringValueNode;
    }

    if (valueTok.kind === TokenKind.Name) {
      // Bool
      if (valueTok.value === 'true' || valueTok.value === 'false') {
        return {
          kind: 'BooleanValue',
          value: valueTok.value === 'true',
        } as BooleanValueNode;
      }

      // Null
      if (valueTok.value === 'null') {
        return {
          kind: 'NullValue',
        } as NullValueNode;
      }

      // Enum
      return {
        kind: 'EnumValue',
        value: valueTok.value,
      } as EnumValueNode;
    }

    if (valueTok.kind === TokenKind.Punctuator) {
      // Variable
      if (valueTok.value === '$') {
        if (isConst) {
          throw new Error('Variables not allowed here');
        }

        const varNameTok = consume(TokenKind.Name);

        return {
          kind: 'Variable',
          name: { kind: 'Name', value: varNameTok.value },
        } as VariableNode;
      }

      if (valueTok.value === '[') {
        const values = [];

        while (! consume(TokenKind.Punctuator, true, ']')) {
          values.push(parseValue(isConst));
        }

        return {
          kind: 'ListValue',
          values,
        } as ListValueNode;
      }

      if (valueTok.value === '{') {
        const fields: ObjectFieldNode[] = [];

        while (! consume(TokenKind.Punctuator, true, '}')) {
          const nameTok = consume(TokenKind.Name, false);
          consume(TokenKind.Punctuator, false, ':');

          fields.push({
            kind: 'ObjectField',
            name: { kind: 'Name', value: nameTok.value },
            value: parseValue(isConst),
          });
        }

        return {
          kind: 'ObjectValue',
          fields,
        } as ObjectValueNode;
      }
    }

    throw new Error(`Invalid value ${tokens[pos].value} at ${tokens[pos].line}, ${tokens[pos].col}`);
  }

  function consume(
    kind?: TokenKind,
    optional: boolean = false,
    value?: string,
  ): Token | null {
    if (kind && tokens[pos].kind !== kind) {
      if (optional) {
        return null;
      }

      throw new Error(
        `Invalid token ${tokens[pos].value} at ${tokens[pos].line}, ${tokens[pos].col}. Expected kind: ${kind}`);
    }

    if (value && tokens[pos].value !== value) {
      if (optional) {
        return null;
      }

      throw new Error(
        `Invalid token ${tokens[pos].value} at ${tokens[pos].line}, ${tokens[pos].col}. Expected value: ${value}`);
    }

    pos++;
    return tokens[pos - 1];
  }

  return {
    kind: 'Document',
    definitions: parseDefinitions(),
  };
}
