import type { OutlineGridKeys } from "./types";

export function arrayToGridKeys(array: string[]) {
  const empty: OutlineGridKeys = {};

  return array.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, empty);
}

export function gridKeysToArray(keys: OutlineGridKeys) {
  return Object.keys(keys);
}