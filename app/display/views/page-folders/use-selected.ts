import type { OutlineGridKeys } from "@/utils";

import {
  arrayToGridKeys,
  gridKeysToArray,
  useRouteStorage
} from "@/utils";
import {
  ref,
  watch
} from "vue";

export function useSelected() {
  const expandedRaw = useRouteStorage("folders-selected");
  const expanded = ref<OutlineGridKeys>({});

  watch(
    expandedRaw,
    (newRawValue) => {
      expanded.value = arrayToGridKeys(newRawValue);
    },
    { immediate: true }
  );

  watch(
    expanded,
    (newValue) => {
      expandedRaw.value = gridKeysToArray(newValue);
    }
  );

  return expanded;
}