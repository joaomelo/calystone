import type { Nodes } from "@/domain";

import { Store } from "@/display/store";

type WithNodes<T> = (nodes: Nodes) => T;

export function useWithNodes<T>(withNodes: WithNodes<T>) {
  const { nodes } = Store.use();
  return withNodes(nodes);
}