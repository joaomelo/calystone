export interface UpdateDateOptions { anchor?: boolean; date: Date }
export interface UpdateDatesOptions { anchor?: boolean; start: Date; due: Date }

export class Dater {
  due: Date | undefined = undefined;
  start: Date | undefined = undefined;

  clearDates() {
    this.due = undefined;
    this.start = undefined;
  }

  stringify() {
    return {
      due: this.due?.toISOString() ?? null,
      start: this.start?.toISOString() ?? null,
    };
  }

  update({ anchor = false, due, start }: UpdateDatesOptions) {
    this.updateStart({ anchor, date: start });
    this.updateDue({ anchor, date: due });
  }

  updateDue({ anchor = false, date }: UpdateDateOptions) {
    const anchoredDate = new Date(date);
    if (anchor) {
      anchoredDate.setHours(23, 59, 59, 999);
    }

    this.due = anchoredDate;

    const isDueSmallerThanStart = this.start && anchoredDate < this.start;
    const isStartEmpty = this.start === undefined;
    if (isDueSmallerThanStart || isStartEmpty) {
      this.updateStart({ anchor, date: anchoredDate });
    }
  }

  updateStart({ anchor = false, date }: UpdateDateOptions) {
    const anchoredStart = new Date(date);
    if (anchor) {
      anchoredStart.setHours(0, 0, 0, 0);
    }

    this.start = anchoredStart;

    const isStartGreaterThanDue = this.due && anchoredStart > this.due;
    const isDueEmpty = this.due === undefined;
    if (isStartGreaterThanDue || isDueEmpty) {
      this.updateDue({ anchor, date: anchoredStart });
    }
  }
}