export function isArray(maybeArray: unknown) {
  return Array.isArray(maybeArray);
}

export function asArray<T>(maybeArray: unknown) {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (isArray(maybeArray)) return maybeArray as T[];
  return [maybeArray as T];
}

export function hasElements(maybeArray: unknown) {
  if (!isArray(maybeArray)) return false;
  return (maybeArray as unknown[]).length > 0;
}