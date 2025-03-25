import type { Node } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { Artifact, Directory } from "@/domain";

export function convert(node: Node): TreeNode {
  const key = node.id;
  const label = node.name;
  const children = solveChildren(node).map(convert);
  const leaf = node instanceof Artifact || (node.status === "loaded" && children.length === 0);

  return { children, data: node, key, label, leaf };
}

function solveChildren(node: Node): Node[] {
  if (!(node instanceof Directory)) return [];

  const children = node.getChildren();

  if (children.length === 0) return [];

  children.sort((a: Node, b: Node) => {
    if (a instanceof Directory && b instanceof Artifact) return -1;
    if (a instanceof Artifact && b instanceof Directory) return 1;
    return a.name.localeCompare(b.name);
  });
  return children;
}