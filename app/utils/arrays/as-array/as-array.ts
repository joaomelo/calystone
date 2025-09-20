type MaybeArray<T> = null | T | T[] | undefined;

export function asArray<T>(maybeArray: MaybeArray<T>) {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  return [maybeArray];
}
