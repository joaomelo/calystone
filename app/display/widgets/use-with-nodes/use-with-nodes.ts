import type { Nodes } from "@/domain";

import { useStore } from "@/domain";

type WithNodes<T> = (nodes: Nodes) => T;

export function useWithNodes<T>(withNodes: WithNodes<T>) {
  const { nodes } = useStore();
  return withNodes(nodes);
}