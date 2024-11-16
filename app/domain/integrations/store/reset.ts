import type { Store } from "./store";

export function reset(store: Store) {
  store.nodes.clear();
  store.connection.value = undefined;
};