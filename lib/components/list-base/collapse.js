import { ref, watch } from "vue";
import { hasElements } from "@lib";

export const COLLAPSE_STATUSES = {
  FLAT: "COLLAPSE_STATUSES.FLAT",
  OPEN: "COLLAPSE_STATUSES.OPEN",
  CLOSED: "COLLAPSE_STATUSES.CLOSED",
};

export function useCollapse(item) {
  const collapse = ref(initialCollapse(item.value));
  watch(item, (newValue) => {
    collapse.value = initialCollapse(newValue);
  });
  return collapse;
}

function initialCollapse(item) {
  return hasElements(item.children)
    ? COLLAPSE_STATUSES.OPEN
    : COLLAPSE_STATUSES.FLAT;
}
