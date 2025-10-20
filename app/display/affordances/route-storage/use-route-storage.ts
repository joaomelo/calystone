import {
  ref,
  watch
} from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";

import {
  asArray,
  isArrayFull
} from "@/utils";

export function useRouteStorage(param: string) {
  const route = useRoute();
  const router = useRouter();

  const localValues = ref<string[]>([]);

  watch(
    resolveQueryValues,
    downloadQueryValues,
    { immediate: true }
  );

  watch(
    () => localValues.value,
    uploadLocalValues
  );

  function downloadQueryValues() {
    if (isSynced()) return;
    localValues.value = resolveQueryValues();
  }

  function uploadLocalValues() {
    if (isSynced()) return;
    void router.replace({ query: {
      ...route.query,
      [param]: localValues.value
    } });
  }

  function isSynced() {
    const querySet = new Set(resolveQueryValues());
    const localSet = new Set(localValues.value);
    const difference = querySet.symmetricDifference(localSet);
    return difference.size === 0;
  }

  function resolveQueryValues() {
    const empty: string[] = [];

    const queryValue = asArray(route.query[param]);
    if (!isArrayFull(queryValue)) return empty;
    if (!queryValue.every(id => typeof id === "string")) return empty;

    return queryValue;
  }

  return localValues;
}