export type Pattern = string[];

export function isPattern(value: unknown): value is Pattern {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

export function asPattern(value: unknown): Pattern {
  if (isPattern(value)) return value;
  return [];
}