import { isObjectLike } from "@/utils";

import type { MediaResources } from "./resources";
import type { Status } from "./status";

import { isMediaResources } from "./resources";
import { isStatus } from "./status";

export interface Media<Resources extends MediaResources> {
  resources: Resources;
  status: Status;
}

export function isMedia<Resources extends MediaResources>(media: unknown): media is Media<Resources> {
  if (!isObjectLike(media)) return false;
  if (!("status" in media) || (!isStatus(media.status))) return false;
  if (!("resources" in media)) return false;
  return isMediaResources(media.resources);
}