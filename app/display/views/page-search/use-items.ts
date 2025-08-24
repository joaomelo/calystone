import type {
  Item,
  ItemData
} from "@/display/views/outline-item";
import type { Node } from "@/domain";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { computed } from "vue";

export function useItems(search: Ref<string>) {
  const { services } = Store.use();

  const items = computed<Item[]>(() => {
    const searchedNodes = search.value
      ? services.retrieveNodes.search(search.value)
      : [];

    return searchedNodes.map((node) => convert(node));
  });

  return items;
}

function convert(node: Node): Item {
  const key = node.id;
  const label = node.name;
  const data: ItemData = {
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
