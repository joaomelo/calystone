import type { Compare } from "./compare";

export function reverse<T>(compare: Compare<T>): Compare<T> {
  return (a: T, b: T): number => -compare(a, b);
}