import type { Id } from "@/utils";

import { extractId } from "@/utils";

import type { Node } from "../node/node";

import { getOrThrow } from "./get";

export function path(nodeOrId: Id | Node, nodes: Map<Id, Node>): string{
  const id = extractId(nodeOrId);
  const node = getOrThrow(id, nodes);

  const basePath = `/${node.name}`;
  if (!node.parentId) return basePath;

  const parent = getOrThrow(node.parentId, nodes);

  return `${path(parent, nodes)}${basePath}`;
}
