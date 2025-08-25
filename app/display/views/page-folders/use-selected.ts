import type { OutlineGridKeys } from "@/utils";

import {
  arrayToGridKeys,
  gridToArrayKeys,
  useRouteStorage
} from "@/utils";
import { computed } from "vue";

export function useSelected() {
  const selectedArray = useRouteStorage("folders-selected");

  const selectedGrided = computed({
    get: () => arrayToGridKeys(selectedArray.value),
    set: (newGridValue: OutlineGridKeys) => {
      selectedArray.value = gridToArrayKeys(newGridValue);
    }
  });

  return selectedGrided;
}