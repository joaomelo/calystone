import type { OutlineGridKeys } from "./types";

export function areArrayAndGridKeysEqual({
  array,
  grid,
}: {
  array: string[],
  grid: OutlineGridKeys
}) {
  const arraySet = new Set(array);
  const keysSet = new Set(Object.keys(grid));
  const difference = arraySet.symmetricDifference(keysSet);
  return difference.size === 0;
}

export function arrayToGridKeys(array: string[]) {
  const empty: OutlineGridKeys = {};

  return array.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, empty);
}

export function gridToArrayKeys(keys: OutlineGridKeys) {
  return Object.keys(keys);
}