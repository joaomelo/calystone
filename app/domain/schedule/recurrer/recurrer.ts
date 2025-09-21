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
    end: Date,
    start: Date
  }) {
    const baseDate = this.reference.value === "completion" ? new Date() : options.end;
    const newEnd = new Date(baseDate);
    newEnd.setHours(options.end.getHours(), options.end.getMinutes(), options.end.getSeconds(), options.end.getMilliseconds());

    switch (this.unit.value) {
      case "days":
        newEnd.setDate(newEnd.getDate() + this.step.value);
        break;
      case "months":
        newEnd.setMonth(newEnd.getMonth() + this.step.value);
        break;
      case "weeks":
        newEnd.setDate(newEnd.getDate() + (this.step.value * 7));
        break;
      case "years":
        newEnd.setFullYear(newEnd.getFullYear() + this.step.value);
        break;
    }

    const originalTimeDiff = options.end.getTime() - options.start.getTime();
    const newStart = new Date(newEnd.getTime() - originalTimeDiff);

    return {
      end: newEnd,
      start: newStart
    };
  }
}
