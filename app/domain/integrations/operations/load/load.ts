import type { ConnectionUnion } from "@/domain/specializations";

import { isFsaConnection, loadFsa } from "@/domain/specializations";

export async function* loadConnection(connection: ConnectionUnion) {
  let load;

  if (isFsaConnection(connection)) {
    load = loadFsa;
  } else {
    throw new Error("a connection must be provided");
  }

  connection.status = "busy";
  yield* load(connection);
  connection.status = "idle";
};
