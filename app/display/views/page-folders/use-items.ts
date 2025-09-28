import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Node } from "@/domain";
import type { OutlineGridKeys } from "@/utils";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import {
  Artifact,
  Directory,
  Progressor,
  TodoArtifact
} from "@/domain";
import { computed } from "vue";

export function useItems(expanded: Ref<OutlineGridKeys>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() =>{
    return services.spawnCollections.list()
      .filter(n => n.isRoot())
      .map((root) => convert(root));
  });

  function convert(node: Node): OutlineNodesItem {
    const key = node.id;
    const label = node.name;

    const children = services.spawnHierarchy.children(node);

    const showToggle = children.length > 0 || maybeHasChildren(node);

    const childrenToRender = expanded.value[node.id] ? children : [];
    childrenToRender.sort(childrenSort);
    const childrenItems = childrenToRender.map(convert);

    return {
      children: childrenItems,
      data: node,
      key,
      label,
      leaf: !showToggle
    };
  }

  function maybeHasChildren(node: Node): boolean {
    if (!(node instanceof Directory)) return false;
    return node.isUnloaded();
  }

  function childrenSort(a: Node, b: Node) {
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
  };

  return items;
}
