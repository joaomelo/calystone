import type { SourceResources } from "@/domain/source";

import { isSourceResources } from "@/domain/source";
import { isObjectLike } from "@/utils";

import type { Status } from "./status";

import { isStatus } from "./status";

export interface Media<Resources extends SourceResources> {
  resources: Resources;
  status: Status;
}

export function isMedia<Resources extends SourceResources>(media: unknown): media is Media<Resources> {
  if (!isObjectLike(media)) return false;
  if (!("status" in media) || (!isStatus(media.status))) return false;
  if (!("resources" in media)) return false;
  return isSourceResources(media.resources);
}