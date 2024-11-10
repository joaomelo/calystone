import type { Id } from "@/utils";

import { isId, isObjectLike } from "@/utils";
import { extractId } from "@/utils";

import type { Node } from "./node";

export function isNode(value: unknown): value is Node {
  if (!isObjectLike(value)) return false;
  if (!("id" in value && isId(value.id))) return false;
  return "name" in value && typeof value.name === "string";
}

export function isRoot(node: Node): boolean {
  return !node.parentId;
}

export function createIsId(id: Id) {
  return (node: Node) => node.id === id;
}

export function isChildrenWith(parentOrId: Id | Node) {
  const id = extractId(parentOrId);
  return (node: Node) => node.parentId === id;
}