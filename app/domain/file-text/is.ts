import { isFile } from "@/domain/file";

import type { FileText, TextMime } from "./file-text";

export function isFileText(value: unknown): value is FileText {
  if (!isFile(value)) return false;
  return isMimeText(value.mime);
}

function isMimeText(value: unknown): value is TextMime {
  return typeof value === "string" && value.startsWith("text/");
}
