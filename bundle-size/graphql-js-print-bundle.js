/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;

var _location = __webpack_require__(2);

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError) {
  // Include (non-enumerable) stack trace.
  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }

  // Compute locations in the source for the given nodes/positions.
  var _source = source;
  if (!_source && nodes && nodes.length > 0) {
    var node = nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;
  if (!_positions && nodes) {
    _positions = nodes.filter(function (node) {
      return Boolean(node.loc);
    }).map(function (node) {
      return node.loc.start;
    });
  }
  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations = void 0;
  var _source2 = _source; // seems here Flow need a const to resolve type.
  if (_source2 && _positions) {
    _locations = _positions.map(function (pos) {
      return (0, _location.getLocation)(_source2, pos);
    });
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    nodes: {
      value: nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    }
  });
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: { value: GraphQLError },
  name: { value: 'GraphQLError' }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GraphQLError = __webpack_require__(0);

Object.defineProperty(exports, 'GraphQLError', {
  enumerable: true,
  get: function get() {
    return _GraphQLError.GraphQLError;
  }
});

var _syntaxError = __webpack_require__(7);

Object.defineProperty(exports, 'syntaxError', {
  enumerable: true,
  get: function get() {
    return _syntaxError.syntaxError;
  }
});

var _locatedError = __webpack_require__(6);

Object.defineProperty(exports, 'locatedError', {
  enumerable: true,
  get: function get() {
    return _locatedError.locatedError;
  }
});

var _formatError = __webpack_require__(5);

Object.defineProperty(exports, 'formatError', {
  enumerable: true,
  get: function get() {
    return _formatError.formatError;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;


/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match = void 0;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return { line: line, column: column };
}

/**
 * Represents a location in a Source.
 */

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;

var _source = __webpack_require__(11);

var _error = __webpack_require__(1);

var _lexer = __webpack_require__(10);

var _kinds = __webpack_require__(9);

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


/**
 * Configuration options to control parser behavior
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function parse(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
function parseValue(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer, false);
  expect(lexer, _lexer.TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
function parseType(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer);
  expect(lexer, _lexer.TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer) {
  var token = expect(lexer, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.NAME,
    value: token.value,
    loc: loc(lexer, token)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SOF);
  var definitions = [];
  do {
    definitions.push(parseDefinition(lexer));
  } while (!skip(lexer, _lexer.TokenKind.EOF));

  return {
    kind: _kinds.DOCUMENT,
    definitions: definitions,
    loc: loc(lexer, start)
  };
}

/**
 * Definition :
 *   - OperationDefinition
 *   - FragmentDefinition
 *   - TypeSystemDefinition
 */
function parseDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      // Note: subscription is an experimental non-spec addition.
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);

      // Note: the Type System IDL is an experimental non-spec addition.
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'extend':
      case 'directive':
        return parseTypeSystemDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer) {
  var start = lexer.token;
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return {
      kind: _kinds.OPERATION_DEFINITION,
      operation: 'query',
      name: null,
      variableDefinitions: null,
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }
  var operation = parseOperationType(lexer);
  var name = void 0;
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    name = parseName(lexer);
  }
  return {
    kind: _kinds.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer) {
  var operationToken = expect(lexer, _lexer.TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    // Note: subscription is an experimental non-spec addition.
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseVariableDefinition, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue?
 */
function parseVariableDefinition(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.SELECTION_SET,
    selections: many(lexer, _lexer.TokenKind.BRACE_L, parseSelection, _lexer.TokenKind.BRACE_R),
    loc: loc(lexer, start)
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer) {
  return peek(lexer, _lexer.TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer) {
  var start = lexer.token;

  var nameOrAlias = parseName(lexer);
  var alias = void 0;
  var name = void 0;
  if (skip(lexer, _lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    alias = null;
    name = nameOrAlias;
  }

  return {
    kind: _kinds.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer),
    directives: parseDirectives(lexer),
    selectionSet: peek(lexer, _lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Arguments : ( Argument+ )
 */
function parseArguments(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseArgument, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument : Name : Value
 */
function parseArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, false)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SPREAD);
  if (peek(lexer, _lexer.TokenKind.NAME) && lexer.token.value !== 'on') {
    return {
      kind: _kinds.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer),
      loc: loc(lexer, start)
    };
  }
  var typeCondition = null;
  if (lexer.token.value === 'on') {
    lexer.advance();
    typeCondition = parseNamedType(lexer);
  }
  return {
    kind: _kinds.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'fragment');
  return {
    kind: _kinds.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer) {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }
  return parseName(lexer);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer, isConst) {
  var token = lexer.token;
  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(lexer, isConst);
    case _lexer.TokenKind.BRACE_L:
      return parseObject(lexer, isConst);
    case _lexer.TokenKind.INT:
      lexer.advance();
      return {
        kind: _kinds.INT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: _kinds.FLOAT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.STRING:
      lexer.advance();
      return {
        kind: _kinds.STRING,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: _kinds.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token)
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: _kinds.NULL,
          loc: loc(lexer, token)
        };
      }
      lexer.advance();
      return {
        kind: _kinds.ENUM,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }
      break;
  }
  throw unexpected(lexer);
}

function parseConstValue(lexer) {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer) {
  return parseValueLiteral(lexer, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer, isConst) {
  var start = lexer.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.LIST,
    values: any(lexer, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(lexer, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.BRACE_L);
  var fields = [];
  while (!skip(lexer, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer, isConst));
  }
  return {
    kind: _kinds.OBJECT,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer, isConst) {
  var start = lexer.token;
  return {
    kind: _kinds.OBJECT_FIELD,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, isConst)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives : Directive+
 */
function parseDirectives(lexer) {
  var directives = [];
  while (peek(lexer, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer));
  }
  return directives;
}

/**
 * Directive : @ Name Arguments?
 */
function parseDirective(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.AT);
  return {
    kind: _kinds.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
function parseTypeReference(lexer) {
  var start = lexer.token;
  var type = void 0;
  if (skip(lexer, _lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expect(lexer, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  } else {
    type = parseNamedType(lexer);
  }
  if (skip(lexer, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  }
  return type;
}

/**
 * NamedType : Name
 */
function parseNamedType(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - TypeExtensionDefinition
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);
      case 'scalar':
        return parseScalarTypeDefinition(lexer);
      case 'type':
        return parseObjectTypeDefinition(lexer);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer);
      case 'union':
        return parseUnionTypeDefinition(lexer);
      case 'enum':
        return parseEnumTypeDefinition(lexer);
      case 'input':
        return parseInputObjectTypeDefinition(lexer);
      case 'extend':
        return parseTypeExtensionDefinition(lexer);
      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

/**
 * SchemaDefinition : schema Directives? { OperationTypeDefinition+ }
 *
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseSchemaDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer);
  var operationTypes = many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}

function parseOperationTypeDefinition(lexer) {
  var start = lexer.token;
  var operation = parseOperationType(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseNamedType(lexer);
  return {
    kind: _kinds.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer, start)
  };
}

/**
 * ScalarTypeDefinition : scalar Name Directives?
 */
function parseScalarTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.SCALAR_TYPE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectTypeDefinition :
 *   - type Name ImplementsInterfaces? Directives? { FieldDefinition+ }
 */
function parseObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.OBJECT_TYPE_DEFINITION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ImplementsInterfaces : implements NamedType+
 */
function parseImplementsInterfaces(lexer) {
  var types = [];
  if (lexer.token.value === 'implements') {
    lexer.advance();
    do {
      types.push(parseNamedType(lexer));
    } while (peek(lexer, _lexer.TokenKind.NAME));
  }
  return types;
}

/**
 * FieldDefinition : Name ArgumentsDefinition? : Type Directives?
 */
function parseFieldDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.FIELD_DEFINITION,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer) {
  if (!peek(lexer, _lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition : Name : Type DefaultValue? Directives?
 */
function parseInputValueDef(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var defaultValue = null;
  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.INPUT_VALUE_DEFINITION,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InterfaceTypeDefinition : interface Name Directives? { FieldDefinition+ }
 */
function parseInterfaceTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INTERFACE_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * UnionTypeDefinition : union Name Directives? = UnionMembers
 */
function parseUnionTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  expect(lexer, _lexer.TokenKind.EQUALS);
  var types = parseUnionMembers(lexer);
  return {
    kind: _kinds.UNION_TYPE_DEFINITION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}

/**
 * UnionMembers :
 *   - NamedType
 *   - UnionMembers | NamedType
 */
function parseUnionMembers(lexer) {
  var members = [];
  do {
    members.push(parseNamedType(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return members;
}

/**
 * EnumTypeDefinition : enum Name Directives? { EnumValueDefinition+ }
 */
function parseEnumTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var values = many(lexer, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.ENUM_TYPE_DEFINITION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}

/**
 * EnumValueDefinition : EnumValue Directives?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.ENUM_VALUE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InputObjectTypeDefinition : input Name Directives? { InputValueDefinition+ }
 */
function parseInputObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INPUT_OBJECT_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * TypeExtensionDefinition : extend ObjectTypeDefinition
 */
function parseTypeExtensionDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  var definition = parseObjectTypeDefinition(lexer);
  return {
    kind: _kinds.TYPE_EXTENSION_DEFINITION,
    definition: definition,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveDefinition :
 *   - directive @ Name ArgumentsDefinition? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'directive');
  expect(lexer, _lexer.TokenKind.AT);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expectKeyword(lexer, 'on');
  var locations = parseDirectiveLocations(lexer);
  return {
    kind: _kinds.DIRECTIVE_DEFINITION,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveLocations :
 *   - Name
 *   - DirectiveLocations | Name
 */
function parseDirectiveLocations(lexer) {
  var locations = [];
  do {
    locations.push(parseName(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return locations;
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer, startToken) {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken, endToken, source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
}

// Print a simplified form when appearing in JSON/util.inspect.
Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return { start: this.start, end: this.end };
};

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer, kind) {
  return lexer.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */
function skip(lexer, kind) {
  var match = lexer.token.kind === kind;
  if (match) {
    lexer.advance();
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expect(lexer, kind) {
  var token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected ' + kind + ', found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(lexer, value) {
  var token = lexer.token;
  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected "' + value + '", found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer, atToken) {
  var token = atToken || lexer.token;
  return (0, _error.syntaxError)(lexer.source, token.start, 'Unexpected ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [parseFn(lexer)];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = __webpack_require__(12);

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return 'fragment ' + name + ' on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ') + selectionSet;
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10) {
    var value = _ref10.value;
    return JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return JSON.stringify(value);
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: function ScalarTypeDefinition(_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeDefinition: function ObjectTypeDefinition(_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ');
  },

  FieldDefinition: function FieldDefinition(_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '));
  },

  InputValueDefinition: function InputValueDefinition(_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  },

  InterfaceTypeDefinition: function InterfaceTypeDefinition(_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeDefinition: function UnionTypeDefinition(_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), '= ' + join(types, ' | ')], ' ');
  },

  EnumTypeDefinition: function EnumTypeDefinition(_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  },

  EnumValueDefinition: function EnumValueDefinition(_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  },

  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  },

  TypeExtensionDefinition: function TypeExtensionDefinition(_ref31) {
    var definition = _ref31.definition;
    return 'extend ' + definition;
  },

  DirectiveDefinition: function DirectiveDefinition(_ref32) {
    var name = _ref32.name,
        args = _ref32.arguments,
        locations = _ref32.locations;
    return 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ');
  }
};

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? indent('{\n' + join(array, '\n')) + '\n}' : '{}';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && maybeString.replace(/\n/g, '\n  ');
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = formatError;

var _invariant = __webpack_require__(8);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  (0, _invariant2.default)(error, 'Received null or undefined error.');
  return {
    message: error.message,
    locations: error.locations,
    path: error.path
  };
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;

var _GraphQLError = __webpack_require__(0);

/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  if (originalError && originalError.path) {
    return originalError;
  }

  var message = originalError ? originalError.message || String(originalError) : 'An unknown error occurred.';
  return new _GraphQLError.GraphQLError(message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;

var _location = __webpack_require__(2);

var _GraphQLError = __webpack_require__(0);

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function syntaxError(source, position, description) {
  var location = (0, _location.getLocation)(source, position);
  var error = new _GraphQLError.GraphQLError('Syntax Error ' + source.name + ' (' + location.line + ':' + location.column + ') ' + description + '\n\n' + highlightSourceAtLocation(source, location), undefined, source, [position]);
  return error;
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var prevLineNum = (line - 1).toString();
  var lineNum = line.toString();
  var nextLineNum = (line + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  return (line >= 2 ? lpad(padLen, prevLineNum) + ': ' + lines[line - 2] + '\n' : '') + lpad(padLen, lineNum) + ': ' + lines[line - 1] + '\n' + Array(2 + padLen + location.column).join(' ') + '^\n' + (line < lines.length ? lpad(padLen, nextLineNum) + ': ' + lines[line] + '\n' : '');
}

function lpad(len, str) {
  return Array(len - str.length + 1).join(' ') + str;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Name

var NAME = exports.NAME = 'Name';

// Document

var DOCUMENT = exports.DOCUMENT = 'Document';
var OPERATION_DEFINITION = exports.OPERATION_DEFINITION = 'OperationDefinition';
var VARIABLE_DEFINITION = exports.VARIABLE_DEFINITION = 'VariableDefinition';
var VARIABLE = exports.VARIABLE = 'Variable';
var SELECTION_SET = exports.SELECTION_SET = 'SelectionSet';
var FIELD = exports.FIELD = 'Field';
var ARGUMENT = exports.ARGUMENT = 'Argument';

// Fragments

var FRAGMENT_SPREAD = exports.FRAGMENT_SPREAD = 'FragmentSpread';
var INLINE_FRAGMENT = exports.INLINE_FRAGMENT = 'InlineFragment';
var FRAGMENT_DEFINITION = exports.FRAGMENT_DEFINITION = 'FragmentDefinition';

// Values

var INT = exports.INT = 'IntValue';
var FLOAT = exports.FLOAT = 'FloatValue';
var STRING = exports.STRING = 'StringValue';
var BOOLEAN = exports.BOOLEAN = 'BooleanValue';
var NULL = exports.NULL = 'NullValue';
var ENUM = exports.ENUM = 'EnumValue';
var LIST = exports.LIST = 'ListValue';
var OBJECT = exports.OBJECT = 'ObjectValue';
var OBJECT_FIELD = exports.OBJECT_FIELD = 'ObjectField';

// Directives

var DIRECTIVE = exports.DIRECTIVE = 'Directive';

// Types

var NAMED_TYPE = exports.NAMED_TYPE = 'NamedType';
var LIST_TYPE = exports.LIST_TYPE = 'ListType';
var NON_NULL_TYPE = exports.NON_NULL_TYPE = 'NonNullType';

// Type System Definitions

var SCHEMA_DEFINITION = exports.SCHEMA_DEFINITION = 'SchemaDefinition';
var OPERATION_TYPE_DEFINITION = exports.OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition';

// Type Definitions

var SCALAR_TYPE_DEFINITION = exports.SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition';
var OBJECT_TYPE_DEFINITION = exports.OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition';
var FIELD_DEFINITION = exports.FIELD_DEFINITION = 'FieldDefinition';
var INPUT_VALUE_DEFINITION = exports.INPUT_VALUE_DEFINITION = 'InputValueDefinition';
var INTERFACE_TYPE_DEFINITION = exports.INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition';
var UNION_TYPE_DEFINITION = exports.UNION_TYPE_DEFINITION = 'UnionTypeDefinition';
var ENUM_TYPE_DEFINITION = exports.ENUM_TYPE_DEFINITION = 'EnumTypeDefinition';
var ENUM_VALUE_DEFINITION = exports.ENUM_VALUE_DEFINITION = 'EnumValueDefinition';
var INPUT_OBJECT_TYPE_DEFINITION = exports.INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition';

// Type Extensions

var TYPE_EXTENSION_DEFINITION = exports.TYPE_EXTENSION_DEFINITION = 'TypeExtensionDefinition';

// Directive Definitions

var DIRECTIVE_DEFINITION = exports.DIRECTIVE_DEFINITION = 'DirectiveDefinition';

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenKind = undefined;
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;

var _error = __webpack_require__(1);

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
function createLexer(source, options) {
  var startOfFileToken = new Tok(SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer
  };
  return lexer;
} /*  /
  /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

function advanceLexer() {
  var token = this.lastToken = this.token;
  if (token.kind !== EOF) {
    do {
      token = token.next = readToken(this, token);
    } while (token.kind === COMMENT);
    this.token = token;
  }
  return token;
}

/**
 * The return type of createLexer.
 */


// Each kind of token.
var SOF = '<SOF>';
var EOF = '<EOF>';
var BANG = '!';
var DOLLAR = '$';
var PAREN_L = '(';
var PAREN_R = ')';
var SPREAD = '...';
var COLON = ':';
var EQUALS = '=';
var AT = '@';
var BRACKET_L = '[';
var BRACKET_R = ']';
var BRACE_L = '{';
var PIPE = '|';
var BRACE_R = '}';
var NAME = 'Name';
var INT = 'Int';
var FLOAT = 'Float';
var STRING = 'String';
var COMMENT = 'Comment';

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = exports.TokenKind = {
  SOF: SOF,
  EOF: EOF,
  BANG: BANG,
  DOLLAR: DOLLAR,
  PAREN_L: PAREN_L,
  PAREN_R: PAREN_R,
  SPREAD: SPREAD,
  COLON: COLON,
  EQUALS: EQUALS,
  AT: AT,
  BRACKET_L: BRACKET_L,
  BRACKET_R: BRACKET_R,
  BRACE_L: BRACE_L,
  PIPE: PIPE,
  BRACE_R: BRACE_R,
  NAME: NAME,
  INT: INT,
  FLOAT: FLOAT,
  STRING: STRING,
  COMMENT: COMMENT
};

/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? token.kind + ' "' + value + '"' : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;

/**
 * Helper function for constructing the Token object.
 */
function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
}

// Print a simplified form when appearing in JSON/util.inspect.
Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? EOF :
    // Trust JSON for ASCII.
    code < 0x007F ? JSON.stringify(String.fromCharCode(code)) :
    // Otherwise print the escaped form.
    '"\\u' + ('00' + code.toString(16).toUpperCase()).slice(-4) + '"'
  );
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;

  var position = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + position - lexer.lineStart;

  if (position >= bodyLength) {
    return new Tok(EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, position);

  // SourceCharacter
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000A && code !== 0x000D) {
    throw (0, _error.syntaxError)(source, position, 'Cannot contain the invalid character ' + printCharCode(code) + '.');
  }

  switch (code) {
    // !
    case 33:
      return new Tok(BANG, position, position + 1, line, col, prev);
    // #
    case 35:
      return readComment(source, position, line, col, prev);
    // $
    case 36:
      return new Tok(DOLLAR, position, position + 1, line, col, prev);
    // (
    case 40:
      return new Tok(PAREN_L, position, position + 1, line, col, prev);
    // )
    case 41:
      return new Tok(PAREN_R, position, position + 1, line, col, prev);
    // .
    case 46:
      if (charCodeAt.call(body, position + 1) === 46 && charCodeAt.call(body, position + 2) === 46) {
        return new Tok(SPREAD, position, position + 3, line, col, prev);
      }
      break;
    // :
    case 58:
      return new Tok(COLON, position, position + 1, line, col, prev);
    // =
    case 61:
      return new Tok(EQUALS, position, position + 1, line, col, prev);
    // @
    case 64:
      return new Tok(AT, position, position + 1, line, col, prev);
    // [
    case 91:
      return new Tok(BRACKET_L, position, position + 1, line, col, prev);
    // ]
    case 93:
      return new Tok(BRACKET_R, position, position + 1, line, col, prev);
    // {
    case 123:
      return new Tok(BRACE_L, position, position + 1, line, col, prev);
    // |
    case 124:
      return new Tok(PIPE, position, position + 1, line, col, prev);
    // }
    case 125:
      return new Tok(BRACE_R, position, position + 1, line, col, prev);
    // A-Z _ a-z
    case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:
    case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:
    case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:
    case 89:case 90:
    case 95:
    case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:
    case 105:case 106:case 107:case 108:case 109:case 110:case 111:
    case 112:case 113:case 114:case 115:case 116:case 117:case 118:
    case 119:case 120:case 121:case 122:
      return readName(source, position, line, col, prev);
    // - 0-9
    case 45:
    case 48:case 49:case 50:case 51:case 52:
    case 53:case 54:case 55:case 56:case 57:
      return readNumber(source, position, code, line, col, prev);
    // "
    case 34:
      return readString(source, position, line, col, prev);
  }

  throw (0, _error.syntaxError)(source, position, unexpectedCharacterMessage(code));
}

/**
 * Report a message that an unexpected character was encountered.
 */
function unexpectedCharacterMessage(code) {
  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use ' + 'a double quote (")?';
  }

  return 'Cannot parse the unexpected character ' + printCharCode(code) + '.';
}

/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */
function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;
  while (position < bodyLength) {
    var code = charCodeAt.call(body, position);
    // tab | space | comma | BOM
    if (code === 9 || code === 32 || code === 44 || code === 0xFEFF) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }
  return position;
}

/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code = void 0;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && (
  // SourceCharacter but not LineTerminator
  code > 0x001F || code === 0x0009));

  return new Tok(COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}

/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);
    if (code >= 48 && code <= 57) {
      throw (0, _error.syntaxError)(source, position, 'Invalid number, unexpected digit after 0: ' + printCharCode(code) + '.');
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }
    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? FLOAT : INT, start, position, line, col, prev, slice.call(body, start, position));
}

/**
 * Returns the new position in the source after reading digits.
 */
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9
    return position;
  }
  throw (0, _error.syntaxError)(source, position, 'Invalid number, expected digit but got: ' + printCharCode(code) + '.');
}

/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null &&
  // not LineTerminator
  code !== 0x000A && code !== 0x000D &&
  // not Quote (")
  code !== 34) {
    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    ++position;
    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);
      switch (code) {
        case 34:
          value += '"';break;
        case 47:
          value += '/';break;
        case 92:
          value += '\\';break;
        case 98:
          value += '\b';break;
        case 102:
          value += '\f';break;
        case 110:
          value += '\n';break;
        case 114:
          value += '\r';break;
        case 116:
          value += '\t';break;
        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));
          if (charCode < 0) {
            throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: ' + ('\\u' + body.slice(position + 1, position + 5) + '.'));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        default:
          throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: \\' + String.fromCharCode(code) + '.');
      }
      ++position;
      chunkStart = position;
    }
  }

  if (code !== 34) {
    // quote (")
    throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
  }

  value += slice.call(body, chunkStart, position);
  return new Tok(STRING, start, position + 1, line, col, prev, value);
}

/**
 * Converts four hexidecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}

/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : // 0-9
  a >= 65 && a <= 70 ? a - 55 : // A-F
  a >= 97 && a <= 102 ? a - 87 : // a-f
  -1;
}

/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */
function readName(source, position, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var end = position + 1;
  var code = 0;
  while (end !== bodyLength && (code = charCodeAt.call(body, end)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122 // a-z
  )) {
    ++end;
  }
  return new Tok(NAME, position, end, line, col, prev, slice.call(body, position, end));
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * A representation of source input to GraphQL. The name is optional,
 * but is mostly useful for clients who store GraphQL documents in
 * source files; for example, if the GraphQL input is in a file Foo.graphql,
 * it might be useful for name to be "Foo.graphql".
 */
var Source = exports.Source = function Source(body, name) {
  _classCallCheck(this, Source);

  this.body = body;
  this.name = name || 'GraphQL';
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var QueryDocumentKeys = exports.QueryDocumentKeys = {
  Name: [],

  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],

  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', 'typeCondition', 'directives', 'selectionSet'],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],

  Directive: ['name', 'arguments'],

  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],

  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],

  ScalarTypeDefinition: ['name', 'directives'],
  ObjectTypeDefinition: ['name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['name', 'directives', 'fields'],
  UnionTypeDefinition: ['name', 'directives', 'types'],
  EnumTypeDefinition: ['name', 'directives', 'values'],
  EnumValueDefinition: ['name', 'directives'],
  InputObjectTypeDefinition: ['name', 'directives', 'fields'],

  TypeExtensionDefinition: ['definition'],

  DirectiveDefinition: ['name', 'arguments', 'locations']
};

var BREAK = exports.BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
function visit(root, visitor, keyMap) {
  var visitorKeys = keyMap || QueryDocumentKeys;

  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;

  do {
    index++;
    var isLeaving = index === keys.length;
    var key = void 0;
    var node = void 0;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (!isLeaving) {
      stack = { inArray: inArray, index: index, keys: keys, edits: edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return maybeNode && typeof maybeNode.kind === 'string';
}

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);

  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}

/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */false);
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== undefined) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */true);
      var result = void 0;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_language_parser__);




/***/ })
/******/ ]);