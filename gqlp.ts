import { DocumentNode } from 'graphql';

export function gqlp(doc: string): DocumentNode {
  const tokens = tokenize(doc);

  return {
    kind: 'Document',
    definitions: [],
  };
}

export function tokenize(doc: string): Token[] {
  let pos = 0;
  let tokens: Token[] = [];

  function skipSpaceOrComment() {
    if(doc[pos].match(/[\s,]/)) {
      pos++;
      return true;
    }

    if (doc[pos] === '#') {
      while(doc[pos] !== '\n' && pos < doc.length) {
        pos++;
      }
      return true;
    }
  }

  // TODO - test all of these
  const singleCharPunctuator = /[!$():=@\[\]{}]/;
  function tokenizePunctuator(): boolean {
    if (singleCharPunctuator.test(doc[pos])) {
      tokens.push({ kind: 'Punctuator', value: doc[pos] });
      pos++;
      return true;
    } else if (doc[pos] === '.') {
      if (doc.length > pos + 2 && doc[pos + 1] === '.' && doc[pos + 2] === '.') {
        tokens.push({ kind: 'Punctuator', value: '...' });
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
      const chars = [];

      // consume first char
      chars.push(doc[pos]);
      pos++;

      // consume rest chars
      while(nameRestChar.test(doc[pos])) {
        chars.push(doc[pos]);
        pos++;
      }

      tokens.push({ kind: 'Name', value: chars.join('') });
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

        tokens.push({ kind: 'FloatValue', value: parseFloat(chars.join('')) });
        return true;
      }

      tokens.push({ kind: 'IntValue', value: parseInt(chars.join(''), 10) });
      return true;
    }
  }

  function tokenizeString() {
    if (doc[pos] === '"') {
      pos++;
      const chars = [];
      let stringEnd = false;

      // Consume characters that aren't ", /, or line terminator
      // TODO line terminator
      while (pos < doc.length) {
        if (doc[pos] === '"') {
          stringEnd = true;
          pos++;

          tokens.push({
            kind: 'StringValue',

            // Try to use JSON.parse to handle escaping, unicode, etc.
            value: JSON.parse('"' + chars.join('') + '"'),
          })

          // break loop
          return true;
        }

        // This is an escaped character
        if (doc[pos] === '\\') {
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

type Token = {
  kind: 'Punctuator' | 'Name' | 'IntValue' | 'FloatValue' | 'StringValue',
  value: string | number,
}
