import { gqlp, tokenize } from './gqlp';
import { parse } from 'graphql';

it('works on an empty document', () => {
  expect(gqlp('query MyQuery { x }')).toEqual(stripLoc(parse('query MyQuery { x }')));
});

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
