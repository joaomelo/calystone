import type { DateRange } from "@/utils";

import {
  isAllDay,
  isDateRange,
  throwError
} from "@/utils";

export interface DaterOptions {
  due?: Date;
  start?: Date,
  allDay?: boolean
}
export interface UpdateDateOptions {
  allDay?: boolean;
  date: Date
}
export interface UpdateDatesOptions {
  allDay?: boolean;
  start: Date;
  due: Date
}

export class Dater implements DateRange {
  due: Date = new Date();
  start: Date = new Date();

  constructor(options: DaterOptions = {}) {
    const { allDay = false } = options;

    const now = new Date();
    const start = options.start ?? options.due ?? now;
    const due = options.due ?? options.start ?? now;
    this.update({
      allDay,
      due,
      start
    });

    if (!isDateRange(this)) throwError("INVALID_DATE_RANGE");
  }

  allDay() {
    return isAllDay(this);
  }

  spansOn(options: {
    end: Date;
    start: Date
  }) {
    return this.start <= options.end && this.due >= options.start;
  }

  stringify() {
    return {
      due: this.due.toISOString(),
      start: this.start.toISOString(),
    };
  }

  update({
    allDay = false,
    due,
    start
  }: UpdateDatesOptions) {
    this.updateStart({
      allDay,
      date: start
    });
    this.updateDue({
      allDay,
      date: due
    });
  }

  updateDue({
    allDay = false,
    date
  }: UpdateDateOptions) {
    const allDayDate = new Date(date);
    if (allDay) {
      allDayDate.setHours(23, 59, 59, 999);
    }

    this.due = allDayDate;

    const isDueSmallerThanStart = allDayDate < this.start;
    if (isDueSmallerThanStart) {
      this.updateStart({
        allDay,
        date: allDayDate
      });
    }
  }

  updateStart({
    allDay = false,
    date
  }: UpdateDateOptions) {
    const allDayDate = new Date(date);
    if (allDay) {
      allDayDate.setHours(0, 0, 0, 0);
    }

    this.start = allDayDate;

    const isStartGreaterThanDue = allDayDate > this.due;
    if (isStartGreaterThanDue) {
      this.updateDue({
        allDay,
        date: allDayDate
      });
    }
  }
}