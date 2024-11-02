import type { Connection } from "./connection";

export function close(connection: Connection) {
  connection.status = "closed";
  connection.root = undefined;
};