import type { ConnectionUnion } from "@/domain/specializations";

import type { Store } from "./store";

import { loadConnection } from "../operations";

export async function feedStore(store: Store, connection: ConnectionUnion) {
  store.connection.value = connection;
  store.nodes.clear();
  for await (const node of loadConnection(store.connection.value)) {
    store.nodes.set(node.id, node);
  }
}