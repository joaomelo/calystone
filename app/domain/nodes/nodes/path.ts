import type { Node } from "../node/node";
import type { Nodes } from "../nodes";

import { getOrThrow } from "./get";

export function createPath(nodes: Nodes){
  const path = (node: Node): string => {
    const basePath = `/${node.name}`;
    if (!node.parentId) return basePath;

    const parent = getOrThrow(nodes, node.parentId);
    return `${path(parent)}${basePath}`;
  };

  return path;
}
