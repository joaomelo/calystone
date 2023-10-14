import type { Treeable } from "./node";

export function isRoot(node: Treeable) {
  return !node.parentId;
}
