export type Ignore = string[];
export const defaultIgnore: Ignore = [];

export function isIgnore(value: unknown): value is Ignore {
  if (!Array.isArray(value)) return false;
  return value.every((v) => typeof v === "string");
}

export function asIgnore(data: unknown): Ignore {
  return isIgnore(data) ? data : defaultIgnore;
}