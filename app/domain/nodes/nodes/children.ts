import type { Id } from "@/utils";

import { extractId } from "@/utils";

import type { Directory } from "../directory/directory";
import type { Node } from "../node";

export function children(nodes: Node[], parentOrId: Directory | Id): Node[] {
  const parentId = extractId(parentOrId);
  return nodes.filter(child => child.parentId === parentId);
}