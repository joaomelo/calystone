import type { Ref } from "vue";

import { computed } from "vue";

import type { OutlineGridKeys } from "@/display/affordances/outline-grid";
import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Compare } from "@/utils";

import { Store } from "@/display/store";
import {
  compareNodesByType,
  Directory,
  Node,
  TodoArtifact
} from "@/domain";
import { comparator } from "@/utils";

export function useItems(expanded: Ref<OutlineGridKeys>) {
  const { services } = Store.use();
  const nodes = services.spawnCollections.nodes();
  const descendancy = services.spawnCollections.descendancy();

  const items = computed<OutlineNodesItem[]>(() =>{
    return nodes.list()
      .filter(n => n.isRoot())
      .map((root) => convert(root));
  });

  function convert(node: Node): OutlineNodesItem {
    const key = node.id;
    const label = node.name;

    const children = descendancy.children(node);

    const showToggle = children.length > 0 || maybeHasChildren(node);

    const childrenToRender = expanded.value[node.id] ? children : [];
    childrenToRender.sort(compare);
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

  return items;
}

function compare(a: Node, b: Node): number {

  const compareTodos: Compare<Node> = (x, y) => {
    if (!(x instanceof TodoArtifact && y instanceof TodoArtifact)) return 0;
    const compare = comparator<TodoArtifact>(
      (x, y) => TodoArtifact.compareByProgress(x, y),
      (x, y) => TodoArtifact.compareBySchedules(x, y),
    );
    return compare(x, y);
  };

  const compareNodes: Compare<Node> = comparator<Node>(
    (a, b) => compareNodesByType(a, b),
    (a, b) => compareTodos(a, b),
    (a, b) => Node.compareByName(a, b)
  );

  return compareNodes(a, b);
}