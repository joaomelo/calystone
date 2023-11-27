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

  const handleStart = () => {
    if (collapse.value === "COLLAPSE_STATUSES.OPEN") {
      collapse.value = "COLLAPSE_STATUSES.CLOSED";
    }
  };

  const handleEnd = () => {
    if (collapse.value === "COLLAPSE_STATUSES.CLOSED") {
      collapse.value = "COLLAPSE_STATUSES.OPEN";
    }
  };

  return { collapse, handleStart, handleEnd };
}

function initialCollapse(item) {
  return hasElements(item.children)
    ? COLLAPSE_STATUSES.OPEN
    : COLLAPSE_STATUSES.FLAT;
}
