import type { Node, Nodes } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { isDirectory } from "@/domain";

export function convert(nodes: Nodes, node: Node): TreeNode {
  const key = node.id;
  const label = node.name;

  if (!isDirectory(node)) return { children: [], icon: "pi pi-file", key, label };

  const children = nodes
    .children(node)
    .map((child) => convert(nodes, child));

  return { children, icon: "pi pi-folder", key, label };
}
