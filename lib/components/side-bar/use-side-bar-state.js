import { ref, watch } from "vue";

export function useSideBarState(isFixed) {
  const state = ref(resolveState(isFixed.value));
  watch(isFixed, (isFixedValue) => (state.value = resolveState(isFixedValue)));
  return state;
}

function resolveState(isFixedValue) {
  return isFixedValue ? "fixed" : "closed";
}
