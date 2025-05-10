export interface DaterOptions { due?: Date; start?: Date, allDay?: boolean }
export interface UpdateDateOptions { allDay?: boolean; date: Date }
export interface UpdateDatesOptions { allDay?: boolean; start: Date; due: Date }

export class Dater {
  due: Date = new Date();
  start: Date = new Date();

  constructor(options: DaterOptions = {}) {
    const { allDay = false, due = new Date(), start = new Date() } = options;
    this.update({ allDay, due, start });
  }

  stringify() {
    return {
      due: this.due.toISOString(),
      start: this.start.toISOString(),
    };
  }

  update({ allDay = false, due, start }: UpdateDatesOptions) {
    this.updateStart({ allDay, date: start });
    this.updateDue({ allDay, date: due });
  }

  updateDue({ allDay = false, date }: UpdateDateOptions) {
    const allDayDate = new Date(date);
    if (allDay) {
      allDayDate.setHours(23, 59, 59, 999);
    }

    this.due = allDayDate;

    const isDueSmallerThanStart = allDayDate < this.start;
    if (isDueSmallerThanStart) {
      this.updateStart({ allDay, date: allDayDate });
    }
  }

  updateStart({ allDay = false, date }: UpdateDateOptions) {
    const allDayDate = new Date(date);
    if (allDay) {
      allDayDate.setHours(0, 0, 0, 0);
    }

    this.start = allDayDate;

    const isStartGreaterThanDue = allDayDate > this.due;
    if (isStartGreaterThanDue) {
      this.updateDue({ allDay, date: allDayDate });
    }
  }
}