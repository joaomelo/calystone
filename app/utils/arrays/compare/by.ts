import type { Compare } from "./compare";

export function by<T, V>({
  compare = defaultCompare,
  nulls = "last",
  select,
}: {
  compare?: Compare<V>
  nulls?: "first" | "last",
  select: (item: T) => null | undefined | V,
}): Compare<T> {

  return (a: T, b: T): number => {
    const aVal = select(a);
    const bVal = select(b);

    const isANull = aVal === null || aVal === undefined;
    const isBNull = bVal === null || bVal === undefined;

    if (isANull && isBNull) return 0;
    if (isANull) return nulls === "first" ? -1 : 1;
    if (isBNull) return nulls === "first" ? 1 : -1;

    return compare(aVal, bVal);
  };
};

function defaultCompare<V>(a: V, b: V): number {
  return a < b
    ? -1
    : a > b
      ? 1
      : 0;
}