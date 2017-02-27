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
  let col = 0;
  let tokens: Token[] = [];

  function pushToken(kind: TokenKind, value: string) {
    tokens.push({
      kind,
      value,

      // In GraphQL responses these are supposed to be 1-indexed
      line: line + 1,
      col: col + 1,
    })
  }

  function skipSpaceOrComment() {
    if(
      doc.charCodeAt(pos) === 32 || // space
      doc.charCodeAt(pos) === 10 || // newline
      doc.charCodeAt(pos) === 9 || // comma
      doc.charCodeAt(pos) === 44 // tab
    ) {
      col++;

      if (doc.charCodeAt(pos) === 10) { // newline
        line++;
        col = 0;
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
  }

  // TODO - test all of these
  const singleCharPunctuator = /[!$():=@\[\]{}]/;
  function tokenizePunctuator(): boolean {
    if (singleCharPunctuator.test(doc[pos])) {
      pushToken('Punctuator', doc[pos]);
      pos++;
      return true;
    } else if (doc[pos] === '.') {
      if (doc.length > pos + 2 && doc[pos + 1] === '.' && doc[pos + 2] === '.') {
        pushToken('Punctuator', '...');
        pos += 3;
        return true;
      } else {
        throw new Error('Syntax error, expected .');
      }
    }
  }

  const nameFirstChar = /[_A-Za-z]/;
  const nameRestChar = /[_0-9A-Za-z]/;
  function tokenizeName(): boolean {
    if(nameFirstChar.test(doc[pos])) {
      const startPos = pos;

      // consume first char
      pos++;

      // consume rest chars
      while(nameRestChar.test(doc[pos])) {
        pos++;
      }

      pushToken('Name', doc.substring(startPos, pos));
      return true;
    }
  }

  const numberFirstChar = /[\-0-9]/;
  const numberIntPartRestChar = /[0-9]/;
  const floatConnectorChar = /[.eE]/;
  const floatRestChar = /[0-9Ee+\-]/;
  function tokenizeNumber(): boolean {
    // -?(0|[1-9][0-9]*)
    if (numberFirstChar.test(doc[pos])) {
      const chars = [];
      let isFloat = false;

      // consume first char
      chars.push(doc[pos]);
      pos++;

      // consume rest chars
      while(numberIntPartRestChar.test(doc[pos])) {
        chars.push(doc[pos]);
        pos++;
      }

      // it might be a float!
      if (floatConnectorChar.test(doc[pos])) {
        // it's a float.
        isFloat = true;
        chars.push(doc[pos]);
        pos++;

        // consume rest chars
        while(floatRestChar.test(doc[pos])) {
          chars.push(doc[pos]);
          pos++;
        }

        pushToken('FloatValue', chars.join(''));
        return true;
      }

      pushToken('IntValue', chars.join(''));
      return true;
    }
  }

  function tokenizeString() {
    if (doc.charCodeAt(pos) === 34) { // "
      pos++;
      const chars = [];
      let stringEnd = false;

      // Consume characters that aren't ", /, or line terminator
      while (pos < doc.length) {
        if (doc.charCodeAt(pos) === 34) { // "
          stringEnd = true;
          pos++;

          pushToken(
            'StringValue',

            // Try to use JSON.parse to handle escaping, unicode, etc.
            JSON.parse('"' + chars.join('') + '"'),
          );

          // break loop
          return true;
        }

        // This is an escaped character
        if (doc.charCodeAt(pos) === 92) { // \
          // consume slash
          chars.push(doc[pos]);
          pos++;

          // consume escaped character
          chars.push(doc[pos]);
          pos++;
        } else {
          // consume character
          chars.push(doc[pos]);
          pos++;
        }
      }

      // We got to the end without a terminator
      throw new Error('unterminated string literal');
    }
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

type TokenKind = 'Punctuator' | 'Name' | 'IntValue' | 'FloatValue' | 'StringValue';

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
    const tok = consume('Name', true);

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
      const nameTok = consume('Name', true);

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
      const nameTok = consume('Name', true);
      consume('Name', false, 'on');

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
    const nameToken = consume('Name', true);

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
    if (consume('Punctuator', true, '(')) {
      while (! consume('Punctuator', true, ')')) {
        consume();
      }
      return [];
    }

    return [];
  }

  function parseDirectives(): DirectiveNode[] {
    const directives: DirectiveNode[] = [];
    while (!! consume('Punctuator', true, '@')) {
      directives.push({
        kind: 'Directive',
        name: { kind: 'Name', value: consume('Name').value, },
        arguments: parseArguments(),
      })
    }
    return directives;
  }

  function parseSelectionSet(optional: boolean = false): SelectionSetNode {
    const exists = !! consume('Punctuator', optional, '{');
    if (! exists) {
      return null;
    }

    const selections = [];
    while (! consume('Punctuator', true, '}')) {
      selections.push(parseSelection());
    }

    return {
      kind: 'SelectionSet',
      selections,
    };
  }

  function parseSelection(optional: boolean = false): SelectionNode {
    const isFragment = consume('Punctuator', true, '...');
    if (isFragment) {
      if (consume('Name', true, 'on') || tokens[pos].kind !== 'Name') {
        return {
          kind: 'InlineFragment',
          typeCondition: parseTypeCondition(),
          directives: parseDirectives(),
          selectionSet: parseSelectionSet(),
        } as InlineFragmentNode;
      }

      return {
        kind: 'FragmentSpread',
        name: { kind: 'Name', value: consume('Name').value },
        directives: parseDirectives(),
      } as FragmentSpreadNode;
    } else {
      // This is a field
      const aliasOrFieldNameTok = consume('Name', optional);
      if (! aliasOrFieldNameTok) {
        return null;
      }

      // Check for a colon to see if it is an alias
      const isAlias = !! consume('Punctuator', true, ':');
      let fieldName: string, alias: string;
      if (isAlias) {
        const fieldNameTok = consume('Name');
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
    const hasArguments = !! consume('Punctuator', true, '(');
    if (!hasArguments) {
      return [];
    }

    const args = [];
    while (! consume('Punctuator', true, ')')) {
      args.push(parseArgument());
    }
    return args;
  }

  function parseArgument(): ArgumentNode {
    const nameTok = consume('Name');
    consume('Punctuator', false, ':');

    return {
      kind: 'Argument',
      name: { kind: 'Name', value: nameTok.value },
      value: parseValue(),
    };
  }

  function parseValue(isConst: boolean = false): ValueNode {
    const valueTok = consume();

    if (
      valueTok.kind === 'IntValue' ||
      valueTok.kind === 'FloatValue' ||
      valueTok.kind === 'StringValue'
    ) {
      return {
        kind: valueTok.kind,
        value: valueTok.value,
      } as IntValueNode | FloatValueNode | StringValueNode;
    }

    if (valueTok.kind === 'Name') {
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

    if (valueTok.kind === 'Punctuator') {
      // Variable
      if (valueTok.value === '$') {
        if (isConst) {
          throw new Error('Variables not allowed here');
        }

        const varNameTok = consume('Name');

        return {
          kind: 'Variable',
          name: { kind: 'Name', value: varNameTok.value },
        } as VariableNode;
      }

      if (valueTok.value === '[') {
        const values = [];

        while (! consume('Punctuator', true, ']')) {
          values.push(parseValue(isConst));
        }

        return {
          kind: 'ListValue',
          values,
        } as ListValueNode;
      }

      if (valueTok.value === '{') {
        const fields: ObjectFieldNode[] = [];

        while (! consume('Punctuator', true, '}')) {
          const nameTok = consume('Name', false);
          const colon = consume('Punctuator', false, ':');

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
    const found = true;
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

  function value() {
    return tokens[pos].value;
  }

  return {
    kind: 'Document',
    definitions: parseDefinitions(),
  };
}
