import type { Connection } from "@/domain/connection";

import { isConnection } from "@/domain/connection";

import type { FsaConnectionResources } from "./resource";

import { isFsaConnectionResources } from "./resource";

export interface FsaConnection extends Connection<FsaConnectionResources> {
  resources: FsaConnectionResources;
}

export function isFsaConnection(connection: unknown): connection is FsaConnection {
  if (!isConnection(connection)) return false;
  return isFsaConnectionResources(connection.resources);
}