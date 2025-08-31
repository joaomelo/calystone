import type {
  OutlineNodesItem,
  OutlineNodesItemMetadata
} from "@/display/views/outlines-node/outline-node";
import type { Node } from "@/domain";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { computed } from "vue";

export function useItems(search: Ref<string>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const searchedNodes = search.value
      ? services.retrieveNodes.search(search.value)
      : [];

    return searchedNodes.map((node) => convert(node));
  });

  return items;
}

function convert(node: Node): OutlineNodesItem {
  const key = node.id;
  const label = node.name;
  const data: OutlineNodesItemMetadata = {
    key,
    type: "node"
  };
  return {
    children: [],
    data,
    key,
    label,
    leaf: true
  };
}
