import type { Item, ItemData } from "@/display/views/outline-item";
import type { Node } from "@/domain";
import type { OutlineGridExpandedKeys } from "@/utils";

import { Store } from "@/display/store";
import { Artifact, Directory } from "@/domain";
import { computed, ref } from "vue";

export function useItems() {
  const { nodes } = Store.use();

  const expandedKeys = ref<OutlineGridExpandedKeys>({});
  const items = computed<Item[]>(() =>
    nodes.list()
      .filter(n => n.isRoot())
      .map((root) => convert({ expanded: expandedKeys.value, node: root }))
  );

  return { expandedKeys, items };
}

function convert(options: { expanded: OutlineGridExpandedKeys; node: Node }): Item {
  const { expanded, node } = options;

  const key = node.id;
  const label = node.name;

  const visibleChildrenNodes = solveChildren({ expanded, node });
  const visibleChildren = visibleChildrenNodes.map((child) => convert({ expanded, node: child }));

  const leaf = isImpossibleToHaveChildren(node);

  const data: ItemData = {
    key,
    type: "node"
  };

  return { children: visibleChildren, data, key, label, leaf };
}

function isImpossibleToHaveChildren(node: Node): boolean {
  if (!(node instanceof Directory)) return true;
  if (!node.isLoaded()) return false;
  return node.children().length === 0;
}

function solveChildren(options: { expanded: OutlineGridExpandedKeys; node: Node }): Node[] {
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