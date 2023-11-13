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
