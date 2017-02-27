const Benchmark = require('benchmark');

const gqlp = require('../lib/gqlp').gqlp;
const tokenize = require('../lib/gqlp').tokenize;
const parse = require('graphql').parse;

const suite = new Benchmark.Suite('graphql', { maxTime: 1 });

const kitchenSink = `# Copyright (c) 2015, Facebook, Inc.
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
`;

const AST = gqlp(kitchenSink);
const ASTJSON = JSON.stringify(AST);

// add tests
suite
.add('tokenize', () => {
  tokenize(kitchenSink);
})
.add('gqlp', () => {
  gqlp(kitchenSink);
})
.add('graphql-js', () => {
  parse(kitchenSink);
})
.add('iterating and doing nothing', () => {
  // I claim no GraphQL parser can be faster than this
  var tokens = [];
  for(var i = 0; i < kitchenSink.length; i++) {
    tokens.push(kitchenSink.charCodeAt(i));
  }
})
.add('parse JSON', () => {
  JSON.parse(ASTJSON);
})
// add listeners
.on('cycle', (event) => {
  console.log(String(event.target));
})
// run async
.run({ 'async': true, maxTime: 1 });
