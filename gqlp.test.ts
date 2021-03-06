import { gqlp, tokenize } from './gqlp';
import { parse } from 'graphql';

testParsing('op and name', 'query MyQuery { x }');
testParsing('op', 'query { x }');
testParsing('no op, no name', '{ x }');
testParsing('alias', '{ x: y }');
testParsing('nested', '{ x { y } }');
testParsing('two fields', '{ x y }');
testParsing('field after selection set', '{ x { y } z }');
testParsing('multi op', 'query { x } query { y }');
testParsing('mutation and subscription', 'mutation { x } subscription { x }');
testParsing('argument', '{ x(a: 5) }');
testParsing('argument float', '{ x(a: 5.0) }');
testParsing('multi arguments', '{ x(a: 1 b: 2) }');
testParsing('scalar', '{ x(a: 1 b: 2.0 c: "hello" d: true e: null f: $var g: ENUM_VAL ) }');
testParsing('list', '{ x(a: [1, 2.0, "hello", true, null, $var, ENUM_VAL] ) }');
testParsing('obj', '{ x(a: { b: 1 c: 2 } ) }');
testParsing('frag', 'fragment x on Y { x }');
testParsing('directive', '{ x @skip(if: true) }');
testParsing('frag spread', '{ ...x }');
testParsing('inline frag', '{ ... on X { y } }');
testParsing('inline frag no condition', '{ ... { y } }');
testParsing('inline frag no condition directive', '{ ... @skip(unless: false) { id } }');
testParsing('kitchen sink', `# Copyright (c) 2015, Facebook, Inc.
# All rights reserved.
#
# This source code is licensed under the BSD-style license found in the
# LICENSE file in the root directory of this source tree. An additional grant
# of patent rights can be found in the PATENTS file in the same directory.

query queryName {
  whoever123is: node(id: [123, 456]) {
    id ,
    ... on User @defer {
      field2 {
        id ,
        alias: field1(first:10, after:$foo,) @include(if: $foo) {
          id,
          ...frag
        }
      }
    }
    ... @skip(unless: $foo) {
      id
    }
    ... {
      id
    }
  }
}

mutation likeStory {
  like(story: 123) @defer {
    story {
      id
    }
  }
}

subscription StoryLikeSubscription {
  storyLikeSubscribe(input: $input) {
    story {
      likers {
        count
      }
      likeSentence {
        text
      }
    }
  }
}

fragment frag on Friend {
  foo(size: $size, bar: $b, obj: {key: "value"})
}

{
  unnamed(truthy: true, falsey: false, nullish: null),
  query
}
`)

// testParsing('var def', 'query ($x = 5) { y(a: $x)}');

function testParsing(name: string, query: string) {
  it(`parsing: ${name}`, () => {
    expect(gqlp(query)).toEqual(stripLoc(parse(query)));
  });
}

it('tokenizes', () => {
  expect(tokenize(' () ...[ ] ')).toMatchSnapshot();
  expect(tokenize('{ x }')).toMatchSnapshot();
  expect(tokenize('{ x(arg: 5) }')).toMatchSnapshot();
  expect(tokenize('{ x(arg: -5.4e+3) }')).toMatchSnapshot();
  expect(tokenize('{ x(arg: "what up") }')).toMatchSnapshot();
  expect(tokenize('{ x(arg: "\\twhat up") }')).toMatchSnapshot();
  expect(tokenize('{ x(arg: "\\u0022 up") }')).toMatchSnapshot();

  // newline
  expect(tokenize(`{
  x
}
`)).toMatchSnapshot();
  // comma
  expect(tokenize(`{ x, }`)).toMatchSnapshot();
  // newline
  expect(tokenize(`{
  # get the field called X
  x
}
`)).toMatchSnapshot();
});

function stripLoc(obj: Object) {
  if (Array.isArray(obj)) {
    return obj.map(stripLoc);
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const nextObj = {};

  Object.keys(obj).forEach(key => {
    if (key !== 'loc') {
      nextObj[key] = stripLoc(obj[key]);
    }
  });

  return nextObj;
}
