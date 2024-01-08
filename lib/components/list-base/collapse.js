import { hasElements } from "@lib";
import { ref, watch } from "vue";

export const COLLAPSE_STATUSES = {
  CLOSED: "COLLAPSE_STATUSES.CLOSED",
  FLAT: "COLLAPSE_STATUSES.FLAT",
  OPEN: "COLLAPSE_STATUSES.OPEN",
};

export function useCollapse(item) {
  const collapse = ref(initialCollapse(item.value));
  watch(item, (newValue) => {
    collapse.value = initialCollapse(newValue);
  });

  const collapseForDragStart = () => {
    if (collapse.value === "COLLAPSE_STATUSES.OPEN") {
      collapse.value = "COLLAPSE_STATUSES.CLOSED";
    }
  };

  const collapseForDragEnd = () => {
    if (collapse.value === "COLLAPSE_STATUSES.CLOSED") {
      collapse.value = "COLLAPSE_STATUSES.OPEN";
    }
  };

  return { collapse, collapseForDragEnd, collapseForDragStart };
}

function initialCollapse(item) {
  return hasElements(item.children) ? COLLAPSE_STATUSES.OPEN : COLLAPSE_STATUSES.FLAT;
}
