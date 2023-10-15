import type { Treeable } from "./treeable";

export function isRoot(node: Treeable) {
  return !node.parentId;
}
