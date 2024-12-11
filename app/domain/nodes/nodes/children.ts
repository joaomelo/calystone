import type { Directory } from "../directory/directory";
import type { Id } from "../ids";
import type { Node } from "../node";

import { extractId } from "../ids";

export function children(nodes: Node[], parentOrId: Directory | Id): Node[] {
  const parentId = extractId(parentOrId);
  return nodes.filter(child => child.parentId === parentId);
}