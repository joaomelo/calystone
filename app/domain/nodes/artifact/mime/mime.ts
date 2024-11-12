export type Mime = string;

export function isMime(value: unknown): value is Mime {
  return typeof value === "string";
}