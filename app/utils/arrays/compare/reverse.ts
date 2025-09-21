import type { Compare } from "./compare";

export function reverse<T>(compare: Compare<T>): Compare<T> {
  return (a: T, b: T): number => {
    const result = -compare(a, b);
    if (result === 0) return 0; // avoid -0
    return result;
  };
}