import type { Id } from "@/utils";

import type { Nodes } from "./nodes";

export function getOrThrow(nodes: Nodes, id: Id) {
  const node = nodes.get(id);
  if (!node) throw new Error(`a node with the id "${id}" was not found`);
  return node;
}
