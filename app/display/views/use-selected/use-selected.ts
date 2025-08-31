import type { OutlineGridKeys } from "@/utils";

import { Store } from "@/display/store";
import {
  arrayToGridKeys,
  gridToArrayKeys,
  useRouteStorage
} from "@/utils";
import { computed } from "vue";

export function useSelected(routeParam: string) {
  const selectedArray = useRouteStorage(routeParam);

  const selectedKeys = computed({
    get: () => arrayToGridKeys(selectedArray.value),
    set: (newGridValue: OutlineGridKeys) => {
      selectedArray.value = gridToArrayKeys(newGridValue);
    }
  });

  const { services } = Store.use();
  const selectedNode = computed(() => {
    const [first] = Object.keys(selectedKeys.value);
    return services.retrieveNodes.get(first);
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