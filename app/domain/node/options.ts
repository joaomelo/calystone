import type { Id } from "@/domain/id";

import { isId } from "@/domain/id";
import { isObjectLike } from "@/utils";

export interface NodeOptions {
  id: Id;
  name: string;
  parentId?: Id;
}

export function isNodeOptions(value: unknown): value is NodeOptions {
  if (!isObjectLike(value)) return false;

  if (!("id" in value)) return false;
  if (!isId(value.id)) return false;

  if (!("name" in value)) return false;
  if (typeof value.name !== "string") return false;

  if (!("parentId" in value)) return true;
  return (typeof value.parentId === "undefined" || isId(value.parentId));
}