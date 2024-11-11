import { isFsaConnection, loadFsa } from "@/domain/file-system-access";

import type { ConnectionUnion } from "../unions";

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
