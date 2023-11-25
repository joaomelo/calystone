import { ref, watch } from "vue";
import { hasElements } from "@lib";
import { COLLAPSE_STATUSES } from "./collapse-statuses";

export function useCollapseStatus(item) {
  const collapseStatus = ref(openOrFlat(item.value));
  watch(item, (newValue) => {
    collapseStatus.value = openOrFlat(newValue);
  });
  return collapseStatus;
}

function openOrFlat(item) {
  return hasElements(item.children)
    ? COLLAPSE_STATUSES.OPEN
    : COLLAPSE_STATUSES.FLAT;
}
