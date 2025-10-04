import type { Ref } from "vue";

import { computed } from "vue";

import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Node } from "@/domain";

import { Store } from "@/display/store";

export function useItems(searchRef: Ref<string>) {
  const { services } = Store.use();
  const searcher = services.spawnCollections.searcher();

  return computed<OutlineNodesItem[]>(() => {
    const search = searchRef.value;
    if (!search.trim()) return [];

    const searchedNodes = searcher.search(search);
    return searchedNodes.map((node) => convert(node));
  });
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
