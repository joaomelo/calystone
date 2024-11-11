import type { Directory } from "./directory";

import { isNode } from "../node";

export function isDirectory(value: unknown): value is Directory {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "directory";
}
