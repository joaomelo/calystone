import type { Node } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { Directory } from "@/domain";

export function convert(node: Node): TreeNode {
  const key = node.id;
  const label = node.name;

  if (!(node instanceof Directory))
    return { children: [], icon: "pi pi-file", key, label };

  const children = node.children().map(convert);
  return { children, icon: "pi pi-folder", key, label };
}
