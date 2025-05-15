import type { OutlineItemData } from "@/display/widgets/outline-item";
import type { Node } from "@/domain";
import type { TreeExpandedKeys } from "primevue/tree";
import type { TreeNode } from "primevue/treenode";

import { Artifact, Directory } from "@/domain";

export function convert(options: { expanded: TreeExpandedKeys; node: Node }): TreeNode {
  const { expanded, node } = options;

  const key = node.id;
  const label = node.name;

  const visibleChildrenNodes = solveChildren({ expanded, node });
  const visibleChildren = visibleChildrenNodes.map((child) => convert({ expanded, node: child }));

  const leaf = isImpossibleToHaveChildren(node);

  const data: OutlineItemData = {
    key,
    type: "node"
  };

  return { children: visibleChildren, data: data as unknown, key, label, leaf };
}

function isImpossibleToHaveChildren(node: Node): boolean {
  if (!(node instanceof Directory)) return true;
  if (!node.isLoaded()) return false;
  return node.children().length === 0;
}

function solveChildren(options: { expanded: TreeExpandedKeys; node: Node }): Node[] {
  const { expanded, node } = options;
  if (!expanded[node.id]) return [];
  if (!(node instanceof Directory)) return [];

  const children = node.children();

  if (children.length === 0) return [];

  children.sort((a: Node, b: Node) => {
    if (a instanceof Directory && b instanceof Artifact) return -1;
    if (a instanceof Artifact && b instanceof Directory) return 1;
    return a.name.localeCompare(b.name);
  });
  return children;
}