import {
  comparator,
  compareByString,
  throwCritical
} from "@/utils";

import type { CriterionValue } from "./criterion-value";

import { isCriterionOptions } from "./criterion-options";
import {
  asCriterionValue,
  isCriterionValue
} from "./criterion-value";

interface CriterionOptions {
  label: string,
  value?: number
}

export class Criterion {

  static isOptions(value: unknown): value is CriterionOptions {
    return isCriterionOptions(value);
  }

  static isValue(value: unknown): value is CriterionValue {
    return isCriterionValue(value);
  }

  static asValue(value?: unknown): CriterionValue {
    return asCriterionValue(value);
  }

  static compareByLabel(a: Criterion, b: Criterion): number {
    const compare = compareByString<Criterion>({ select: (criterion) => criterion.label, });
    return compare(a, b);
  }

  static compareByValue(a: Criterion, b: Criterion): number {
    const compare = comparator((a: Criterion, b: Criterion) => b.value - a.value);
    return compare(a, b);
  }

  static create(value: Criterion | CriterionOptions): Criterion {
    if (value instanceof Criterion) return value;
    return new Criterion(value);
  }

  private _label: string;
  private _value: CriterionValue;

  constructor({
    label,
    value
  }: CriterionOptions) {
    if (label.length === 0) {
      throwCritical("CRITERION_LABEL_CANNOT_BE_EMPTY");
    }

    this._label = label;
    this._value = Criterion.asValue(value);
  }

  get label() {
    return this._label;
  }

  get value() {
    return this._value;
  }

  isSame(other: Criterion): boolean {
    return this.label === other.label;
  }

  isSome(others: Criterion[]): boolean {
    return others.some(other => this.isSame(other));
  }

  zeroed(): Criterion {
    return new Criterion({ label: this.label });
  }
}
