import type { Directory } from "../directory";
import type { Node } from "../node";

export function descendantOf(node: Node, maybeAscendant: Directory): boolean {
  let isDescendant = false;
  let maybeParent = node.parent();
  while (maybeParent) {
    if (maybeParent.equal(maybeAscendant)) {
      isDescendant = true;
      break;
    }
    maybeParent = maybeParent.parent();
  }
  return isDescendant;
}