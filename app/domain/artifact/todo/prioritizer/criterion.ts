import {
  comparator,
  compareByString
} from "@/utils";

export type CriterionValue = number;

export class Criterion {

  static isValue(value: unknown): value is CriterionValue {
    return typeof value === "number" && value >= 0 && value <= 1;
  }

  static asValue(value?: unknown): CriterionValue {
    if (typeof value !== "number") return 0;
    return Math.max(0, Math.min(value, 1));
  }

  static compareByLabel(a: Criterion, b: Criterion): number {
    const compare = compareByString<Criterion>({ select: (criterion) => criterion.label, });
    return compare(a, b);
  }

  static compareByValue(a: Criterion, b: Criterion): number {
    const compare = comparator((a: Criterion, b: Criterion) => b.value - a.value);
    return compare(a, b);
  }

  private _label: string;
  private _value: CriterionValue;

  constructor({
    label,
    value
  }: {
    label: string,
    value?: number
  }) {
    this._label = label;
    this._value = Criterion.asValue(value);
  }

  get label() {
    return this._label;
  }

  get value() {
    return this._value;
  }
}
