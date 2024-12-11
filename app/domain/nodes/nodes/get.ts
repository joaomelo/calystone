import type { Id } from "../ids";
import type { Node } from "../node";

export function getOrThrow(id: Id, nodes: Map<Id, Node>) {
  const node = nodes.get(id);
  if (!node) throw new Error(`a node with the id "${id}" was not found`);
  return node;
}
