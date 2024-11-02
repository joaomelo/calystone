import { closeSource } from "@/domain/source";

import type { Store } from "./store";

export function resetStore(store: Store) {
  store.artifacts.clear();
  closeSource(store.source);
};