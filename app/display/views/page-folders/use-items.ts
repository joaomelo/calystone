import type {
  Item,
  ItemData
} from "@/display/views/outline-item";
import type { Node } from "@/domain";
import type { OutlineGridExpandedKeys } from "@/utils";

import { Store } from "@/display/store";
import {
  Artifact,
  Directory,
  Progressor,
  TodoArtifact
} from "@/domain";
import {
  computed,
  ref
} from "vue";

export function useItems() {
  const { services } = Store.use();
  const expandedKeys = ref<OutlineGridExpandedKeys>({});

  const items = computed<Item[]>(() =>{
    return services.retrieveNodes.list()
      .filter(n => n.isRoot())
      .map((root) => convert(root));
  });

  function convert(node: Node): Item {
    const key = node.id;
    const label = node.name;

    const visibleChildrenNodes = solveChildren(node);
    const visibleChildren = visibleChildrenNodes.map((child) => convert(child));

    const leaf = isImpossibleToHaveChildren(node);

    const data: ItemData = {
      key,
      type: "node"
    };

    return {
      children: visibleChildren,
      data,
      key,
      label,
      leaf
    };
  }

  function isImpossibleToHaveChildren(node: Node): boolean {
    if (!(node instanceof Directory)) return true;
    if (!node.isLoaded()) return false;
    const hasChildren = services.queryHierarchy.hasChildren(node);
    return !hasChildren;
  }

  function solveChildren(node: Node): Node[] {
    if (!expandedKeys.value[node.id]) return [];
    if (!(node instanceof Directory)) return [];

    const children = services.queryHierarchy.children(node);
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

  return {
    expandedKeys,
    items
  };
}
