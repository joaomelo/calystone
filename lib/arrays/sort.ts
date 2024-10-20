import { clone } from "@joaomelo/objects";

import type { MaybeArray } from "./maybe-array";

import { asArray } from "./as-array";

export function sort<T, K extends keyof T>(
  maybeArray: MaybeArray<T>, 
  field: K & (T[K] extends Date | number | string ? K : never)
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

