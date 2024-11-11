import type { Id } from "@/utils";

import type { Nodes } from "./nodes";

export function getOrThrow(nodes: Nodes, id: Id) {
  const node = get(nodes, id);
  if (!node) throw new Error(`id "${id}" must be a valid node id`);
  return node;
}

export function get(nodes: Nodes, id: Id) {
  const node = nodes.get(id);
  return node;
}