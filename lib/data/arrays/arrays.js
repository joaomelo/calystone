import { clone } from "../objects";

export function asArray(maybeArray) {
  if (maybeArray === undefined || maybeArray === null) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  return [maybeArray];
}

export function hasElements(maybeArray) {
  if (!Array.isArray(maybeArray)) return false;
  return maybeArray.length > 0;
}

export function sort(maybeArray, field) {
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
