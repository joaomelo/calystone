import { isObjectLike } from "@/utils";

import type { Status } from "./status";

import { isStatus } from "./status";

export interface Connection {
  status: Status;
}

export function isConnection(connection: unknown): connection is Connection {
  if (!isObjectLike(connection)) return false;
  return ("status" in connection) && (isStatus(connection.status));
}