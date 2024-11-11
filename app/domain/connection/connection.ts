import type { SourceResources } from "@/domain/source";

import { isSourceResources } from "@/domain/source";
import { isObjectLike } from "@/utils";

import type { Status } from "./status";

import { isStatus } from "./status";

export interface Connection<Resources extends SourceResources> {
  resources: Resources;
  status: Status;
}

export function isConnection<Resources extends SourceResources>(connection: unknown): connection is Connection<Resources> {
  if (!isObjectLike(connection)) return false;
  if (!("status" in connection) || (!isStatus(connection.status))) return false;
  if (!("resources" in connection)) return false;
  return isSourceResources(connection.resources);
}