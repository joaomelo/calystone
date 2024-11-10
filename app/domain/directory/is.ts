import { isNode } from "@/domain/node";

import type { Directory } from "./directory";

export function isDirectory(value: unknown): value is Directory {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "directory";
}
