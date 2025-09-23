export type StepValue = number;

export const defaultStepValue: StepValue = 1;

export class Step {

  static isValue(value: unknown): value is StepValue {
    return typeof value === "number" && value > 0;
  }

  static compare(a: Step, b: Step): number {
    return a.value - b.value;
  }

  value: StepValue;

  constructor(value: StepValue = defaultStepValue) {
    this.value = value;
  }
}
