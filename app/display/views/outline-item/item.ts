import type { TreeGridItem } from "@/utils";

import { isObjectLike } from "@/utils";

const validTypes = ["node", "tag"] as const;

export interface Item extends TreeGridItem {
  data: ItemData;
}

export interface ItemData {
  type: typeof validTypes[number];
  key: string
}

export function isItemData(data: unknown): data is ItemData {
  if (!isObjectLike(data)) return false;
  if (!("type" in data)) return false;
  if (!("key" in data)) return false;

  const { key, type } = data;

  if (!validTypes.includes(type as typeof validTypes[number])) return false;
  if (typeof key !== "string") return false;

  return true;
}
