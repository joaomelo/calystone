export type RecurrenceReferenceValue = typeof recurrenceReferenceValues[number];

const recurrenceReferenceValues = ["completion", "due"] as const;
export const defaultRecurrenceReferenceValue: RecurrenceReferenceValue = "completion";

export class RecurrenceReference {
  value: RecurrenceReferenceValue;

  constructor(value: RecurrenceReferenceValue = defaultRecurrenceReferenceValue) {
    this.value = value;
  }

  static isRecurrenceReferenceValue(value: unknown): value is RecurrenceReferenceValue {
    return recurrenceReferenceValues.includes(value as RecurrenceReferenceValue);
  }
}
