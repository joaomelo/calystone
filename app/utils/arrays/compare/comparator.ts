import type { Compare } from "./compare";

export function comparator<T>(...comparers: Compare<T>[]): Compare<T> {
  return (a: T, b: T): number => {
    for (const compare of comparers) {
      const r = compare(a, b);
      if (r !== 0) return r;
    }
    return 0;
  };
}