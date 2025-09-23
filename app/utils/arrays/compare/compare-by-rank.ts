import type { Compare } from "./compare";

import { compareBy } from "./compare-by";

export function compareByRank<T, V>({
  nulls,
  rank,
  select
}: {
  nulls?: "first" | "last",
  rank: readonly V[];
  select: (item: T) => null | undefined | V
}): Compare<T> {

  const normalizedSelect = (item: T): null | V => {
    const value = select(item);
    if (value === null || value === undefined) return null;
    if (!rank.includes(value)) return null;
    return value;
  };

  const compare: Compare<V> = (a, b) => {
    const aIndex = rank.indexOf(a);
    const bIndex = rank.indexOf(b);
    return aIndex - bIndex;
  };

  return compareBy({
    compare,
    nulls,
    select: normalizedSelect
  });
}