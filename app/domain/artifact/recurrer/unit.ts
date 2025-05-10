export type RecurrenceUnitValue = typeof recurrenceUnitValues[number];

const recurrenceUnitValues = ["days", "months", "weeks", "years"] as const;
export const defaultRecurrenceUnitValue: RecurrenceUnitValue = "days";

export class RecurrenceUnit {
  value: RecurrenceUnitValue;

  constructor(value: RecurrenceUnitValue = defaultRecurrenceUnitValue) {
    this.value = value;
  }

  static isRecurrenceUnitValue(value: unknown): value is RecurrenceUnitValue {
    return recurrenceUnitValues.includes(value as RecurrenceUnitValue);
  }
}
