import { inject } from "vue";
import { key } from "./service";

export function useService() {
  const service = inject(key);
  if (!service)
    throw new Error(
      "the service singleton must be installed in the vue app as a plugin"
    );
  return service;
}
