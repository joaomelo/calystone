import { computed } from "vue";

import type { OutlineGridKeys } from "@/display/affordances/outline-grid";

import {
  arrayToGridKeys,
  gridToArrayKeys
} from "@/display/affordances/outline-grid";
import { useRouteStorage } from "@/display/affordances/route-storage";
import { Store } from "@/display/store";

export function useSelected(routeParam: string) {
  const selectedArray = useRouteStorage(routeParam);

  const selectedKeys = computed({
    get: () => arrayToGridKeys(selectedArray.value),
    set: (newGridValue: OutlineGridKeys) => {
      selectedArray.value = gridToArrayKeys(newGridValue);
    }
  });

  const { services } = Store.use();
  const nodes = services.spawnCollections.nodes();
  const selectedNode = computed(() => {
    const [first] = Object.keys(selectedKeys.value);
    return nodes.get(first);
  });

  const hasSelected = computed(() => Boolean(selectedNode.value));

  function unselect() {
    selectedKeys.value = {};
  }

  return {
    hasSelected,
    selectedKeys,
    selectedNode,
    unselect
  };
}