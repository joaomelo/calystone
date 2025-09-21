import {
  comparator,
  compareBy,
  isAllDay
} from "@/utils";

export interface DaterOptions {
  end?: Date;
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
  end: Date
}

export class Dater {
  private _end: Date = new Date();
  private _start: Date = new Date();

  constructor(options: DaterOptions = {}) {
    const { allDay = false } = options;

    const now = new Date();
    const start = options.start ?? options.end ?? now;
    const end = options.end ?? start;

    this.update({
      allDay,
      end,
      start
    });
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get allDay() {
    return isAllDay(this.start, this.end);
  }

  static compare(a: Dater, b: Dater): number {
    const compareByStart = compareBy({ select: (item: Dater) => item.start });
    const compareByEnd = compareBy({ select: (item: Dater) => item.end });
    const compareDaters = comparator(
      compareByStart,
      compareByEnd
    );
    return compareDaters(a, b);
  }

  spansOn(options: {
    end: Date;
    start: Date
  }) {
    return this.start <= options.end && this.end >= options.start;
  }

  makeAllDay() {
    if (this.allDay) return;

    const currentStart = this.start;
    const currentEnd = this.end;
    this.update({
      allDay: true,
      end: currentEnd,
      start: currentStart
    });
  }

  update({
    allDay = false,
    end,
    start
  }: UpdateDatesOptions) {
    this.updateStart({
      allDay,
      date: start
    });
    this.updateEnd({
      allDay,
      date: end
    });
  }

  updateEnd({
    allDay = false,
    date
  }: UpdateDateOptions) {
    const newDate = new Date(date);
    if (allDay) {
      newDate.setHours(23, 59, 59, 999);
    }

    this._end = newDate;

    const isEndSmallerThanStart = newDate < this.start;
    if (isEndSmallerThanStart) {
      this.updateStart({
        allDay,
        date: newDate
      });
    }
  }

  updateStart({
    allDay = false,
    date
  }: UpdateDateOptions) {
    const newDate = new Date(date);
    if (allDay) {
      newDate.setHours(0, 0, 0, 0);
    }

    this._start = newDate;

    const isStartGreaterThanEnd = newDate > this.end;
    if (isStartGreaterThanEnd) {
      this.updateEnd({
        allDay,
        date: newDate
      });
    }
  }
}