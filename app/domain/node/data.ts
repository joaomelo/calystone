import type { Id } from "@/domain/id";
import type { Nodes } from "@/domain/nodes";

import { isId } from "@/domain/id";
import { isObjectLike } from "@/utils";

export interface NodeData {
  id: Id;
  name: string;
  parentId?: Id;
}

export type NodeOptions = { nodes: Nodes } & NodeData;

export function isNodeData(value: unknown): value is NodeData {
  if (!isObjectLike(value)) return false;

  if (!("id" in value)) return false;
  if (!isId(value.id)) return false;

  if (!("name" in value)) return false;
  if (typeof value.name !== "string") return false;

  if (!("parentId" in value)) return true;
  return (typeof value.parentId === "undefined" || isId(value.parentId));
}