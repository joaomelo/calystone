import {
  comparator,
  compareBy,
  throwCritical
} from "@/utils";

import type { ReferenceValue } from "./reference";
import type { StepValue } from "./step";
import type { UnitValue } from "./unit";

import { Reference } from "./reference";
import { Step } from "./step";
import { Unit } from "./unit";

export interface RecurrerOptions {
  reference?: ReferenceValue;
  step?: StepValue;
  unit?: UnitValue;
}

export class Recurrer {
  static compare(a: Recurrer, b: Recurrer): number {
    const compareByUnit = compareBy<Recurrer, Unit>({
      compare: (a, b) => Unit.compare(a, b),
      nulls: "last",
      select: (item) => item.unit
    });

    const compareByStep = compareBy<Recurrer, Step>({
      compare: (a, b) => Step.compare(a, b),
      nulls: "last",
      select: (item) => item.step
    });

    const compareByReference = compareBy<Recurrer, Reference>({
      compare: (a, b) => Reference.compare(a, b),
      nulls: "last",
      select: (item) => item.reference
    });

    const compareRecurrers = comparator(
      compareByUnit,
      compareByStep,
      compareByReference
    );

    return compareRecurrers(a, b);
  }

  reference: Reference;
  step: Step;
  unit: Unit;

  constructor(options: RecurrerOptions = {}) {
    const {
      reference,
      step,
      unit
    } = options;

    if (unit && !Unit.isValue(unit)) {
      throwCritical("INVALID_RECURRENCE_UNIT");
    }

    if (step && !Step.isValue(step)) {
      throwCritical("INVALID_RECURRENCE_STEP");
    }

    if (reference && !Reference.isValue(reference)) {
      throwCritical("INVALID_RECURRENCE_REFERENCE");
    }

    this.unit = new Unit(unit);
    this.step = new Step(step);
    this.reference = new Reference(reference);
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
