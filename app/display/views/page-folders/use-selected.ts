import {
  ref,
  watch
} from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";

const foldersSelectedKey = "folders-selected";

export function useSelected() {
  const route = useRoute();
  const router = useRouter();

  const selected = ref<string | undefined>();

  watch(
    () => route.query[foldersSelectedKey],
    downloadValue,
    { immediate: true }
  );

  watch(
    () => selected.value,
    uploadValue
  );

  function downloadValue() {
    if (isSynced()) return;
    const queryValue = decodeQueryValue();
    selected.value = queryValue;
  }

  function uploadValue() {
    if (isSynced()) return;
    void router.replace({ query: {
      ...route.query,
      [foldersSelectedKey]: selected.value
    } });
  }

  function isSynced() {
    const queryValue = decodeQueryValue();
    return selected.value === queryValue;
  }

  function decodeQueryValue() {
    const queryValue = route.query[foldersSelectedKey];
    return typeof queryValue === "string"
      ? queryValue
      : undefined;
  }

  return selected;
}