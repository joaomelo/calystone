import type { Artifact } from "../artifact";
import type { Mime } from "../mime";

import { isTextMime } from "../mime";
import { isArtifact } from "./artifact";

export function isText(value: Artifact | Mime ): boolean {
  const mime = isArtifact(value) ? value.mime : value;
  return isTextMime(mime);
}
