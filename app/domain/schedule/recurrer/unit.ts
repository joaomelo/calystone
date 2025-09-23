export type UnitValue = typeof unitValues[number];

const unitValues = ["days", "months", "weeks", "years"] as const;
export const defaultRecurrenceUnitValue: UnitValue = "days";

export class Unit {

  static isValue(value: unknown): value is UnitValue {
    return unitValues.includes(value as UnitValue);
  }

  static compare(a: Unit, b: Unit): number {
    return unitValues.indexOf(a.value) - unitValues.indexOf(b.value);
  }

  value: UnitValue;

  constructor(value: UnitValue = defaultRecurrenceUnitValue) {
    this.value = value;
  }
}
