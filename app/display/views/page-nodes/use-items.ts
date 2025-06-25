import type { Item, ItemData } from "@/display/views/outline-item";
import type { Node, Nodes } from "@/domain";
import type { OutlineGridExpandedKeys } from "@/utils";

import { Store } from "@/display/store";
import { Descendancy } from "@/domain";
import { Artifact, Directory, Progressor, TodoArtifact } from "@/domain";
import { computed, ref } from "vue";

export function useItems() {
  const { nodes } = Store.use();

  const expandedKeys = ref<OutlineGridExpandedKeys>({});
  const items = computed<Item[]>(() =>{
    return nodes.list()
      .filter(n => n.isRoot())
      .map((root) => convert({ expanded: expandedKeys.value, node: root, nodes }));
  });

  return { expandedKeys, items };
}

function convert(options: { expanded: OutlineGridExpandedKeys; node: Node, nodes: Nodes }): Item {
  const { expanded, node, nodes } = options;

  const key = node.id;
  const label = node.name;

  const visibleChildrenNodes = solveChildren({ expanded, node, nodes });
  const visibleChildren = visibleChildrenNodes.map((child) => convert({ expanded, node: child, nodes }));

  const leaf = isImpossibleToHaveChildren({ node, nodes });

  const data: ItemData = {
    key,
    type: "node"
  };

  return { children: visibleChildren, data, key, label, leaf };
}

function isImpossibleToHaveChildren(options: { node: Node, nodes: Nodes }): boolean {
  const { node, nodes } = options;
  if (!(node instanceof Directory)) return true;
  if (!node.isLoaded()) return false;

  const descendancy = new Descendancy({ directory: node, nodes });
  return !descendancy.hasChildren();
}

function solveChildren(options: { expanded: OutlineGridExpandedKeys; node: Node, nodes: Nodes }): Node[] {
  const { expanded, node, nodes } = options;
  if (!expanded[node.id]) return [];
  if (!(node instanceof Directory)) return [];

  const descendancy = new Descendancy({ directory: node, nodes });
  const children = descendancy.children();

  if (children.length === 0) return [];

  children.sort((a: Node, b: Node) => {
    if (a instanceof Directory && b instanceof Artifact) return -1;
    if (a instanceof Artifact && b instanceof Directory) return 1;

    if (a instanceof Directory && b instanceof Directory) {
      return a.name.localeCompare(b.name);
    }
    if (!(a instanceof TodoArtifact) && !(b instanceof TodoArtifact)) {
      return a.name.localeCompare(b.name);
    }

    if (a instanceof TodoArtifact && !(b instanceof TodoArtifact)) return -1;
    if (!(a instanceof TodoArtifact) && b instanceof TodoArtifact) return 1;

    if (a instanceof TodoArtifact && b instanceof TodoArtifact) {
      const progressOrder = Progressor.compare(a.progress(), b.progress());
      if (progressOrder !== 0) return progressOrder;
    }

    return a.name.localeCompare(b.name);
  });

  return children;
}