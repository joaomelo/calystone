import { isArtifact } from "@/domain/artifact";

import type { FileText, TextMime } from "./file-text";

export function isArtifactText(value: unknown): value is FileText {
  if (!isArtifact(value)) return false;
  return isMimeText(value.mime);
}

function isMimeText(value: unknown): value is TextMime {
  return typeof value === "string" && value.startsWith("text/");
}
