import { gqlp, tokenize } from './gqlp';
import { parse } from 'graphql';

testParsing('op and name', 'query MyQuery { x }');
testParsing('op', 'query { x }');
testParsing('no op, no name', '{ x }');
testParsing('alias', '{ x: y }');
testParsing('nested', '{ x { y } }');
testParsing('two fields', '{ x y }');
testParsing('multi op', 'query { x } query { y }');
testParsing('mutation and subscription', 'mutation { x } subscription { x }');

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
