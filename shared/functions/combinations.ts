type UnaryFunction = (arg: unknown) => unknown;

export function pipe(...fns: UnaryFunction[]): UnaryFunction {
  return (x) => fns.reduce((v, fn) => fn(v), x);
}
