import type { Ref } from "vue";

import {
  computed,
  watch
} from "vue";

import type { OutlineGridKeys } from "@/display/affordances/outline-grid";

import {
  arrayToGridKeys,
  gridToArrayKeys
} from "@/display/affordances/outline-grid";
import { useRouteStorage } from "@/display/affordances/route-storage";
import { Store } from "@/display/store";
import { isArrayFull } from "@/utils";

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