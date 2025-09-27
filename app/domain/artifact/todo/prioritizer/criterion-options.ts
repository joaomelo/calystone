import { isObjectLike } from "@/utils";

import type { CriterionValue } from "./criterion-value";

import { isCriterionValue } from "./criterion-value";

export interface CriterionOptions {
  label: string,
  value?: CriterionValue
}

export function isCriterionOptions(value: unknown): value is CriterionOptions {
  if (!isObjectLike(value)) return false;
  if (!("label" in value) || typeof value.label !== "string") return false;
  if ("value" in value && !isCriterionValue(value.value)) return false;
  return true;
}