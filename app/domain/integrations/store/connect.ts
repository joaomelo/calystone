import type { Connection } from "@/domain/sources";

import type { Store } from "./store";

import { loadConnection } from "../operations";

export async function connectStore(store: Store, connection: Connection) {
  store.connection.value = connection;
  store.nodes.clear();
  for await (const node of loadConnection(store.connection.value)) {
    store.nodes.set(node.id, node);
  }
}