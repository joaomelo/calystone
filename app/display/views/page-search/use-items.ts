import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Node } from "@/domain";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { computed } from "vue";

export function useItems(search: Ref<string>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const searchedNodes = search.value
      ? services.spawnCollections.search(search.value)
      : [];

    return searchedNodes.map((node) => convert(node));
  });

  return items;
}

function convert(node: Node): OutlineNodesItem {
  const key = node.id;
  const label = node.name;
  return {
    children: [],
    data: node,
    key,
    label,
    leaf: true
  };
}
