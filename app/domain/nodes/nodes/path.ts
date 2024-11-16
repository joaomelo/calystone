import type { Id } from "@/utils";

import { extractId } from "@/utils";

import type { Node } from "../node/node";
import type { Nodes } from "../nodes";

export function path(nodes: Nodes, nodeOrId: Id | Node): string{
  const id = extractId(nodeOrId);
  const node = nodes.getOrThrow(id);

  const basePath = `/${node.name}`;
  if (!node.parentId) return basePath;

  const parent = nodes.getOrThrow(node.parentId);

  return `${path(nodes, parent)}${basePath}`;
}
