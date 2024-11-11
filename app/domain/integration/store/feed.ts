import type { Store } from "./store";

import { loadConnection } from "../load";

export async function feed(store: Store) {
  if (!store.connection.value) throw new Error("connection must be present in order to load");

  store.nodes.clear();
  for await (const node of loadConnection(store.connection.value)) {
    store.nodes.set(node.id, node);
  }
}