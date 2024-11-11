export type MimeText = `text/${string}`;

export function isMimeText(value: unknown): value is MimeText {
  return typeof value === "string" && value.startsWith("text/");
}
