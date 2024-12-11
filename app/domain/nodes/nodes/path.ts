import type { Id } from "../ids";
import type { Node } from "../node/node";

import { extractId } from "../ids";
import { getOrThrow } from "./get";

export function path(nodeOrId: Id | Node, nodes: Map<Id, Node>): string{
  const id = extractId(nodeOrId);
  const node = getOrThrow(id, nodes);

  const basePath = `/${node.name}`;
  if (!node.parentId) return basePath;

  const parent = getOrThrow(node.parentId, nodes);

  return `${path(parent, nodes)}${basePath}`;
}
