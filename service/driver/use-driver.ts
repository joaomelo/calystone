import { inject } from "vue";
import { key } from "./driver";

export function useDriver() {
  const service = inject(key);
  if (!service)
    throw new Error(
      `the singleton for the key "${key}" must be installed in the vue app as a plugin`
    );
  return service;
}
