import type { Directory } from "@/domain/directory";
import type { Node } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

export function resolveChildren(options: { directory: Directory; nodes: Nodes }): Node[] {
  const { directory, nodes } = options;
  return nodes.list().filter(node => node.parentId === directory.id);
}

export function resolveDescendants(options: { directory: Directory; nodes: Nodes }): Node[] {
  const { directory, nodes } = options;
  const children = resolveChildren({ directory, nodes });
  return children.flatMap(child => resolveDescendants({ directory: child, nodes }));
}
