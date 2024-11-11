import type { Artifact } from "../artifact";
import type { MimeText } from "./mime";

import { isArtifact } from "../artifact";
import { isMimeText } from "./mime";

export interface TextArtifact extends Artifact {
  mime: MimeText;
}

export function isTextArtifact(value: unknown): value is TextArtifact {
  if (!isArtifact(value)) return false;
  return isMimeText(value.mime);
}
