export type Type = "binary" | "text";

export function type(mime: string): Type {
  if (mime.startsWith("text/")) return "text";
  return "binary";
}
