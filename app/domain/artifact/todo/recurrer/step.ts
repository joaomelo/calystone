export type RecurrenceStepValue = number;

export const defaultStepValue: RecurrenceStepValue = 1;

export class RecurrenceStep {
  value: RecurrenceStepValue;

  constructor(value: RecurrenceStepValue = defaultStepValue) {
    this.value = value;
  }

  static isStepValue(value: unknown): value is RecurrenceStepValue {
    return typeof value === "number" && value > 0;
  }
}
