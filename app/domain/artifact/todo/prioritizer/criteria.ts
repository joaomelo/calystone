import { isObjectLike } from "@/utils";

export type Criteria = Criterion[];

export interface Criterion {
  label: string;
  value: CriterionValue
}

export type CriterionValue = number & { readonly __brand: "CriterionValue" };

export function asCriterionValue(value?: number): CriterionValue {
  return Math.max(0, Math.min(value ?? 0, 1)) as CriterionValue;
}

export function isCriteria(maybe: unknown): maybe is Criteria {
  if (!Array.isArray(maybe)) return false;
  return maybe.every(isCriterion);
}

function isCriterion(maybe: unknown): maybe is Criterion {
  if (!isObjectLike(maybe)) return false;
  if (!("label" in maybe) || typeof maybe.label !== "string") return false;
  if (!("value" in maybe) || typeof maybe.value !== "number" || maybe.value < 0 || maybe.value > 1) return false;
  return true;
}
