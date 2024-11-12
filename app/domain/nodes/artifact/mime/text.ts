import type { Mime } from "./mime";

export function isTextMime(mime: Mime): boolean {
  return mime.startsWith("text/");
}
