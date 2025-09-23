import {
  comparator,
  compareBy,
  throwCritical
} from "@/utils";

import type {
  UpdateDateOptions,
  UpdateDatesOptions
} from "../dater";
import type {
  ReferenceValue,
  StepValue,
  UnitValue
} from "../recurrer";

import { Dater } from "../dater";
import { Recurrer } from "../recurrer";

export class Scheduler {
  static compare(a: Scheduler, b: Scheduler): number {

    const compareByDater = compareBy<Scheduler, Dater>({
      compare: (a, b) => Dater.compare(a, b),
      nulls: "last",
      select: (item) => item._dater
    });

    const compareByRecurrer = compareBy<Scheduler, Recurrer>({
      compare: (a, b) => Recurrer.compare(a, b),
      nulls: "last",
      select: (item) => item._recurrer
    });

    const compareSchedulers = comparator(
      compareByDater,
      compareByRecurrer
    );

    return compareSchedulers(a, b);
  }

  private _dater?: Dater;
  private _recurrer?: Recurrer;

  get hasDates() {
    return this._dater !== undefined;
  }

  get hasRecurrence() {
    return this._recurrer !== undefined;
  }

  clearDates() {
    this._dater = undefined;
    this._recurrer = undefined;
  }

  clearRecurrence() {
    this._recurrer = undefined;
  }

  private getDaterOrThrow() {
    if (!this._dater) throwCritical("SCHEDULER_HAS_NO_DATES");
    return this._dater;
  }

  private getRecurrerOrThrow() {
    if (!this._recurrer) throwCritical("SCHEDULER_HAS_NO_RECURRENCE");
    return this._recurrer;
  }

  cycleRecurrence() {
    const dater = this.getDaterOrThrow();
    const recurrer = this.getRecurrerOrThrow();

    const currentStart = dater.start;
    const currentEnd = dater.end;

    const {
      end,
      start
    } = recurrer.next({
      end: currentEnd,
      start: currentStart
    });

    dater.update({
      allDay: false,
      end,
      start
    });
  }

  get start() {
    if (!this._dater) return undefined;
    return this._dater.start;
  }

  get end() {
    if (!this._dater) return undefined;
    return this._dater.end;
  }

  get allDay() {
    if (!this._dater) return false;
    return this._dater.allDay;
  }

  get reference() {
    if (!this._recurrer) return undefined;
    return this._recurrer.reference.value;
  }

  get step() {
    if (!this._recurrer) return undefined;
    return this._recurrer.step.value;
  }

  get unit() {
    if (!this._recurrer) return undefined;
    return this._recurrer.unit.value;
  }

  spansOn(options: {
    end: Date;
    start: Date
  }): boolean {
    if (!this._dater) return false;
    return this._dater.spansOn(options);
  }

  updateDates(options: UpdateDatesOptions) {
    if (this._dater) {
      this._dater.update(options);
      return;
    }
    this._dater = new Dater(options);
  }

  makeAllDay() {
    if (this._dater) {
      this._dater.makeAllDay();
      return;
    }
    this._dater = new Dater({ allDay: true });
  }

  updateStart(options: UpdateDateOptions) {
    if (this._dater) {
      this._dater.updateStart(options);
      return;
    }

    const {
      allDay,
      date: start
    } = options;

    this._dater = new Dater({
      allDay,
      start
    });
  }

  updateEnd(options: UpdateDateOptions) {
    if (this._dater) {
      this._dater.updateEnd(options);
      return;
    }

    const {
      allDay,
      date: end
    } = options;

    this._dater = new Dater({
      allDay,
      end
    });
  }

  private prepareRecurrerForUpdate() {
    if (!this._dater) {
      this._dater = new Dater();
    }

    if (!this._recurrer) {
      this._recurrer = new Recurrer();
    }

    return this._recurrer;
  }

  updateRecurrence({
    reference,
    step,
    unit
  }: {
    reference: ReferenceValue;
    step: StepValue;
    unit: UnitValue
  }) {
    this.updateUnit(unit);
    this.updateStep(step);
    this.updateReference(reference);
  }

  updateReference(reference: ReferenceValue) {
    const recurrer = this.prepareRecurrerForUpdate();
    recurrer.reference.value = reference;
  }

  updateStep(step: StepValue) {
    const recurrer = this.prepareRecurrerForUpdate();
    recurrer.step.value = step;
  }

  updateUnit(unit: UnitValue) {
    const recurrer = this.prepareRecurrerForUpdate();
    recurrer.unit.value = unit;
  }

}
