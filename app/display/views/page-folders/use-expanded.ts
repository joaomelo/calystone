import type { OutlineGridExpandedKeys } from "@/utils";

import { isArrayFull } from "@/utils";
import {
  ref,
  watch
} from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";

const foldersExpandedKey = "folders-expanded";

export function useExpanded() {
  const route = useRoute();
  const router = useRouter();

  const expanded = ref<OutlineGridExpandedKeys>({});

  watch(
    () => route.query[foldersExpandedKey],
    downloadValue,
    { immediate: true }
  );

  watch(
    () => expanded.value,
    uploadValue
  );

  function downloadValue() {
    if (isSynced()) return;
    const queryValue = decodeQueryValue();
    expanded.value = queryValue;
  }

  function uploadValue() {
    if (isSynced()) return;
    const refValue = encodeRefValue();
    void router.replace({ query: {
      ...route.query,
      [foldersExpandedKey]: refValue
    } });
  }

  function isSynced() {
    const queryValue = decodeQueryValue();
    const querySet = new Set(Object.keys(queryValue));
    const expandedSet = new Set(Object.keys(expanded.value));
    const difference = querySet.symmetricDifference(expandedSet);
    return difference.size === 0;
  }

  function decodeQueryValue() {
    const empty: OutlineGridExpandedKeys = {};

    const rawValue = route.query[foldersExpandedKey];
    if (!isArrayFull(rawValue)) return empty;
    if (!rawValue.every(id => typeof id === "string")) return empty;

    return rawValue.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, empty);
  }

  function encodeRefValue() {
    return Object.keys(expanded.value);
  }

  return expanded;
}