import type { Store } from "./store";

export function resetStore(store: Store) {
  store.nodes.clear();
  store.connection.value = undefined;
};