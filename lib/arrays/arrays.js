export function asArray(maybeArray) {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  return [maybeArray];
}

export function hasElements(maybeArray) {
  if (!Array.isArray(maybeArray)) return false;
  return maybeArray.length > 0;
}
