type Reference = "completion" | "due";
type Step = number;
type Unit = "days" | "months" | "weeks" | "years";

export class Recurrer {
  reference: Reference = "completion";
  step: Step = 1;
  unit: Unit = "days";

  next(options: { due: Date, start: Date }) {
    const baseDate = this.reference === "completion" ? new Date() : options.due;
    const newDue = new Date(baseDate);
    newDue.setHours(options.due.getHours(), options.due.getMinutes(), options.due.getSeconds(), options.due.getMilliseconds());

    switch (this.unit) {
      case "days":
        newDue.setDate(newDue.getDate() + this.step);
        break;
      case "months":
        newDue.setMonth(newDue.getMonth() + this.step);
        break;
      case "weeks":
        newDue.setDate(newDue.getDate() + (this.step * 7));
        break;
      case "years":
        newDue.setFullYear(newDue.getFullYear() + this.step);
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
      reference: this.reference,
      step: this.step,
      unit: this.unit,
    };
  }
}
