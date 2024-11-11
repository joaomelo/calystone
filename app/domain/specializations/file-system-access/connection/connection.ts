import type { Connection } from "@/domain/sources";

import { isConnection } from "@/domain/sources";

import type { FsaConnectionResources } from "./resource";

import { isFsaConnectionResources } from "./resource";

export interface FsaConnection extends Connection {
  resources: FsaConnectionResources;
}

export function isFsaConnection(connection: unknown): connection is FsaConnection {
  if (!isConnection(connection)) return false;
  if (!("resources" in connection)) return false;
  return isFsaConnectionResources(connection.resources);
}