export function and(...fns) {
  return (x) => fns.every((fn) => fn(x));
}

export function pipe(...fns) {
  return (x) => fns.reduce((v, fn) => fn(v), x);
}
