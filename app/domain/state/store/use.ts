import { inject } from "vue";

import type { ProviderKey } from "./state";

export function useStore<T>(providerKey: ProviderKey<T>) {
  const maybeState = inject(providerKey);
  if (!maybeState) {
    throw new Error("no state found");
  }
  return maybeState;
}
