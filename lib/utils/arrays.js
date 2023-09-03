export function isArray(maybeArray) {
  return Array.isArray(maybeArray);
}

export function asArray(maybeArray) {
  if (isArray(maybeArray)) return maybeArray;
  if (maybeArray === undefined || maybeArray === null) return [];
  return [maybeArray];
}

export function hasElements(maybeArray) {
  if (!isArray(maybeArray)) return false;
  return maybeArray.length > 0;
}
