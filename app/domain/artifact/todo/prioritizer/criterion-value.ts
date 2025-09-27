export type CriterionValue = number;

export function asCriterionValue(value?: unknown): CriterionValue {
  if (typeof value !== "number") return 0;
  return Math.max(0, Math.min(value, 1));
}

export function isCriterionValue(value: unknown): value is CriterionValue {
  return typeof value === "number" && value >= 0 && value <= 1;
}