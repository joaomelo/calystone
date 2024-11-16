import type { Connection } from "@/domain/connection";

import { isFsaConnection, loadFsa } from "@/domain/specializations";

export async function* loadConnection(connection: Connection) {
  let load;

  if (isFsaConnection(connection)) {
    load = loadFsa;
  } else {
    throw new Error("a connection with source resources must be provided");
  }

  connection.status = "busy";
  yield* load(connection);
  connection.status = "idle";
};
