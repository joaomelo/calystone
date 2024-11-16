import { inject } from "vue";

import { key } from "./key";

export function useStore() {
  const maybeStore = inject(key);
  if (!maybeStore) {
    throw new Error("store was not provided during initialization");
  }
  return maybeStore;
}