import type { Id } from "@/domain/nodes/ids";

import { isObjectLike } from "@/domain/lang";

export interface NodeData {
  id: Id;
  name: string;
  parentId?: Id;
}

export function isNodeData(value: unknown): value is NodeData {
  if (!isObjectLike(value)) return false;
  if (!("id" in value) || (typeof value.id !== "string")) return false;
  if (!("name" in value) || (typeof value.name !== "string")) return false;
  if (("parentId" in value) && typeof value.parentId !== "string") return false;
  return true;
}