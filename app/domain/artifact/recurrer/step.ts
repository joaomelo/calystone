export type StepValue = number;

export const defaultStepValue: StepValue = 1;

export class RecurrenceStep {
  value: StepValue;

  constructor(value: StepValue = defaultStepValue) {
    this.value = value;
  }

  static isStepValue(value: unknown): value is StepValue {
    return typeof value === "number" && value > 0;
  }
}
