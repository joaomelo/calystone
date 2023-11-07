import { inject } from "vue";
import { key } from "./pilot";

export function usePilot() {
  const pilot = inject(key);
  if (!pilot)
    throw new Error(
      "the singleton must be installed in the vue app as a plugin"
    );
  return pilot;
}
