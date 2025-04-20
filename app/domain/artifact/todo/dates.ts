export interface UpdateDateOptions { anchor?: boolean; date: Date | null }

export class Dates {
  due: Date | null = null;
  start: Date | null = null;

  clearDates() {
    this.due = null;
    this.start = null;
  }

  stringifiableDue() {
    return this.due?.toISOString() ?? null;
  }

  stringifiableStart() {
    return this.start?.toISOString() ?? null;
  }

  updateDue({ anchor = false, date }: UpdateDateOptions) {
    if (date === null) {
      this.clearDates();
      return;
    }

    const anchoredDate = new Date(date);
    if (anchor) {
      anchoredDate.setHours(23, 59, 59, 999);
    }

    this.due = anchoredDate;

    const isDueSmallerThanStart = this.start && anchoredDate < this.start;
    const isStartEmpty = this.start === null;
    if (isDueSmallerThanStart || isStartEmpty) {
      this.updateStart({ anchor, date: anchoredDate });
    }
  }

  updateStart({ anchor = false, date }: UpdateDateOptions) {
    if (date === null) {
      this.clearDates();
      return;
    }

    const anchoredStart = new Date(date);
    if (anchor) {
      anchoredStart.setHours(0, 0, 0, 0);
    }

    this.start = anchoredStart;

    const isStartGreaterThanDue = this.due && anchoredStart > this.due;
    const isDueEmpty = this.due === null;
    if (isStartGreaterThanDue || isDueEmpty) {
      this.updateDue({ anchor, date: anchoredStart });
    }
  }
}