import { inject } from "vue";

import { key } from "./key";

export function useGlobals() {
  const globals = inject(key);
  if (!globals)
    throw new Error(
      "the globals dependency container must be installed in the vue app as a plugin",
    );

  return globals;
}

export function useInject(maybeName) {
  const globals = useGlobals();
  return globals.inject(maybeName);
}
