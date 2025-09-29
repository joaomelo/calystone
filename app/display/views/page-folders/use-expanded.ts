import type { OutlineGridKeys } from "@/utils";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import {
  arrayToGridKeys,
  gridToArrayKeys,
  isArrayFull,
  useRouteStorage
} from "@/utils";
import {
  computed,
  watch
} from "vue";

export function useExpanded(selectedKeys: Ref<OutlineGridKeys>) {

  const { services } = Store.use();
  const ascendancy = services.spawnCollections.ascendancy();

  const expandedArray = useRouteStorage("folders-expanded");

  watch(
    selectedKeys,
    (newSelectedKeys) => {
      const selectedIds = Object.keys(newSelectedKeys);
      if (!isArrayFull(selectedIds)) return;

      const selectedId = selectedIds[0];

      const ascendants = ascendancy
        .ascendants(selectedId)
        .map(({ id }) => id);
      if (!isArrayFull(ascendants)) return;
      if (ascendants.every((id) => expandedArray.value.includes(id))) return;

      const newExpandedSet = new Set([...ascendants, ...expandedArray.value]);
      expandedArray.value = Array.from(newExpandedSet);
    },
    {
      deep: true,
      immediate: true
    }
  );

  const expandedGrided = computed({
    get: () => arrayToGridKeys(expandedArray.value),
    set: (newGridValue: OutlineGridKeys) => {
      expandedArray.value = gridToArrayKeys(newGridValue);
    }
  });

  return expandedGrided;
}