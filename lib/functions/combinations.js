export function pipe(...fns) {
  return (x) => fns.reduce((v, fn) => fn(v), x);
}
