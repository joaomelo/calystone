import { inject } from "vue";
import { key } from "./key";

export function usePilot() {
  const pilot = inject(key);
  if (!pilot)
    throw new Error(
      "the pilot singleton must be installed in the vue app as a plugin"
    );

  return pilot;
}

export function useCase(useCase) {
  const pilot = usePilot();
  if (!pilot[useCase])
    throw new Error("the use case name must be present as a pilot method");

  return pilot[useCase]();
}
