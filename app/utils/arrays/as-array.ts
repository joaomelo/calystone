import type { MaybeArray } from "./maybe-array";

export function asArray<T>(maybeArray: MaybeArray<T>): T[] {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  return [maybeArray];
}
