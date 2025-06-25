import type { NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { Directory } from "@/domain/directory";

export function resolveParent(options: { node: NodeOrId; nodes: Nodes }): Directory | undefined {
  const node = options.nodes.get(options.node);
  if (!node) return;
  if (!node.parentId) return;

  const parent = options.nodes.get(node.parentId);
  if (!parent) return;
  if (!(parent instanceof Directory)) return;

  return parent;
}