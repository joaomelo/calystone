export type Source = string;

export function isSource(source: unknown): source is Source {
  return typeof source === "string";
}