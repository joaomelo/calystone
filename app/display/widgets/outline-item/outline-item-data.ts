import { isObjectLike } from "@/utils";

const validTypes = ["node", "tag"] as const;

export interface OutlineItemData {
  type: typeof validTypes[number];
  key: string
}

export function isOutlineItemData(data: unknown): data is OutlineItemData {
  if (!isObjectLike(data)) return false;
  if (!("type" in data)) return false;
  if (!("key" in data)) return false;

  const { key, type } = data;

  if (!validTypes.includes(type as typeof validTypes[number])) return false;
  if (typeof key !== "string") return false;

  return true;
}
