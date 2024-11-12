// mime lib is used because the browserr file.type is not reliable, it is unable to offer mime types for files like markdown (*.md)
import mime from "mime";

import type { Mime } from "./mime";

import { isMime } from "./mime";

export function solveMime(name: string): Mime {
  const mimeValue = mime.getType(name);
  return isMime(mimeValue) ? mimeValue : "application/octet-stream";
}