import type { Id } from "../ids";
import type { Node } from "../node";

import { Directory } from "../directory";
import { extractId } from "../ids";
import { children } from "./children";

export function descendants(nodes: Node[], parentOrId: Directory | Id): Node[] {
  const parentId = extractId(parentOrId);
  const next = children(nodes, parentId);

  if (next.length === 0) return [];

  return next.reduce(
    (acc, child) =>
      (child instanceof Directory)
        ? acc.concat(descendants(nodes, child))
        : acc,
    next
  );
}