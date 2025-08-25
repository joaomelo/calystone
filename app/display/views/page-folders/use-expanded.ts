import type { OutlineGridKeys } from "@/utils";

import {
  arrayToGridKeys,
  gridToArrayKeys,
  useRouteStorage
} from "@/utils";
import { computed } from "vue";

export function useExpanded() {
  const expandedArray = useRouteStorage("folders-expanded");

  const expandedGrided = computed({
    get: () => arrayToGridKeys(expandedArray.value),
    set: (newGridValue: OutlineGridKeys) => {
      expandedArray.value = gridToArrayKeys(newGridValue);
    }
  });

  return expandedGrided;
}