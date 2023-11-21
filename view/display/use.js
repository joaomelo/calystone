import { inject } from "vue";
import { key } from "./key";

export function useDisplay() {
  const display = inject(key);
  if (!display)
    throw new Error(
      "the display singleton must be installed in the vue app as a plugin"
    );

  return display;
}
