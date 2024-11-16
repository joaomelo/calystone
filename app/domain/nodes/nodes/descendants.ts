import type { Id } from "@/utils";

import { extractId } from "@/utils";

import type { Directory } from "../directory/directory";
import type { Node } from "../node";

import { isDirectory } from "../directory/is";
import { children } from "./children";

export function descendants(nodes: Node[], parentOrId: Directory | Id): Node[] {
  const parentId = extractId(parentOrId);
  const next = children(nodes, parentId);

  if (next.length === 0) return [];

  return next.reduce(
    (acc, child) =>
      (isDirectory(child))
        ? acc.concat(descendants(nodes, child))
        : acc,
    next
  );
}