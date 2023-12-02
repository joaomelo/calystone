export function and(...fns) {
  return (x) => fns.every((fn) => fn(x));
}

export function or(...fns) {
  return (x) => fns.some((fn) => fn(x));
}
