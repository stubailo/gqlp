import { gqlp, tokenize } from './gqlp';
import { parse } from 'graphql';

it('works on an empty document', () => {
  //expect(gqlp('{ x }')).toEqual(parse('{ x }'));
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
});
