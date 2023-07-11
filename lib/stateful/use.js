import { ref } from "vue";
import { useGlobals } from "../globals";
import { getParamNames } from "../utils";

export function useStateful(stateful, map) {
  const data = ref(map(stateful));
  stateful.subscribe((stateful) => (data.value = map(stateful)));
  return data;
}

export function useGlobalStateful(map) {
  const globals = useGlobals();
  const key = getParamNames(map)[0];
  const stateful = globals[key];

  return useStateful(stateful, map);
}
