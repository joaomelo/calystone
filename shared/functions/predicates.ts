export type Predicate = (value: unknown) => boolean;

export function and(...fns: Predicate[]): Predicate {
  return (x) => fns.every((fn) => fn(x));
}
