export type ReferenceValue = typeof referenceValues[number];

const referenceValues = ["due", "completion"] as const;
export const defaultReferenceValue: ReferenceValue = "completion";

export class Reference {

  static isValue(value: unknown): value is ReferenceValue {
    return referenceValues.includes(value as ReferenceValue);
  }

  static compare(a: Reference, b: Reference): number {
    return referenceValues.indexOf(a.value) - referenceValues.indexOf(b.value);
  }

  value: ReferenceValue;

  constructor(value: ReferenceValue = defaultReferenceValue) {
    this.value = value;
  }
}
