import { clone } from "../objects";

type MaybeArray<T> = null | T | T[] | undefined;

export function asArray<T>(maybeArray: MaybeArray<T>): T[] {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  return [maybeArray];
}

export function hasElements<T>(maybeArray: MaybeArray<T>): boolean {
  if (!Array.isArray(maybeArray)) return false;
  return maybeArray.length > 0;
}

export function sort<T, K extends keyof T>(
  maybeArray: MaybeArray<T>, 
  field: Extract<T[K], Date | number | string> & K
): T[] {
  const sorted = clone(asArray(maybeArray));

  return sorted.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    let flag = 0;
    if (aValue < bValue) flag = -1;
    if (aValue > bValue) flag = 1;
    return flag;
  });
}

