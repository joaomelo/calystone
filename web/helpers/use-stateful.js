import { ref } from "vue";

export function useStateful(stateful, map) {
  const data = ref(map(stateful));
  stateful.subscribe((stateful) => (data.value = map(stateful)));
  return data;
}
