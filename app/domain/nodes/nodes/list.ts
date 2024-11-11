import type { Nodes } from "./nodes";

export function list(nodes: Nodes) {
  return Array.from(nodes.values());
}