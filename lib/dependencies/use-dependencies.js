import { inject } from "vue";
import { key } from "./key";

export function useDependencies() {
  const dependencies = inject(key);
  if (!dependencies)
    throw new Error(
      "the dependencies container must be installed in the vue app as a plugin"
    );

  return dependencies.inject();
}
