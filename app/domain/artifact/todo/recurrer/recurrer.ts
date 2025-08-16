import { throwCritical } from "@/utils";

import type { RecurrenceReferenceValue } from "./reference";
import type { RecurrenceStepValue } from "./step";
import type { RecurrenceUnitValue } from "./unit";

import { RecurrenceReference } from "./reference";
import { RecurrenceStep } from "./step";
import { RecurrenceUnit } from "./unit";

export interface RecurrerOptions {
  reference?: RecurrenceReferenceValue;
  step?: RecurrenceStepValue;
  unit?: RecurrenceUnitValue;
}

export class Recurrer {
  reference: RecurrenceReference;
  step: RecurrenceStep;
  unit: RecurrenceUnit;

  constructor(options: RecurrerOptions = {}) {
    const {
      reference,
      step,
      unit
    } = options;

    if (reference && !RecurrenceReference.isRecurrenceReferenceValue(reference)) {
      throwCritical("INVALID_RECURRENCE_REFERENCE");
    }

    if (step && !RecurrenceStep.isStepValue(step)) {
      throwCritical("INVALID_RECURRENCE_STEP");
    }

    if (unit && !RecurrenceUnit.isRecurrenceUnitValue(unit)) {
      throwCritical("INVALID_RECURRENCE_UNIT");
    }

    this.reference = new RecurrenceReference(reference);
    this.step = new RecurrenceStep(step);
    this.unit = new RecurrenceUnit(unit);
  }

  next(options: {
    due: Date,
    start: Date
  }) {
    const baseDate = this.reference.value === "completion" ? new Date() : options.due;
    const newDue = new Date(baseDate);
    newDue.setHours(options.due.getHours(), options.due.getMinutes(), options.due.getSeconds(), options.due.getMilliseconds());

    switch (this.unit.value) {
      case "days":
        newDue.setDate(newDue.getDate() + this.step.value);
        break;
      case "months":
        newDue.setMonth(newDue.getMonth() + this.step.value);
        break;
      case "weeks":
        newDue.setDate(newDue.getDate() + (this.step.value * 7));
        break;
      case "years":
        newDue.setFullYear(newDue.getFullYear() + this.step.value);
        break;
    }

    const originalTimeDiff = options.due.getTime() - options.start.getTime();
    const newStart = new Date(newDue.getTime() - originalTimeDiff);

    return {
      due: newDue,
      start: newStart
    };
  }

  stringify() {
    return {
      reference: this.reference.value,
      step: this.step.value,
      unit: this.unit.value,
    };
  }
}
