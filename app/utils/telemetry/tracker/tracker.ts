import type { PerformanceData } from "./performance";

export class Tracker {
  private readonly data: PerformanceData[] = [];
  private readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  amount() {
    return this.data.reduce((acc, { amount }) => acc + amount, 0);
  }

  avg() {
    const time = this.time();
    const amount = this.amount();
    if (amount === 0) return 0;
    return time / amount;
  }

  record() {
    const start = performance.now();

    return (amount = 1) => {

      const ignore = -1;
      if (amount === ignore) return;

      const end = performance.now();
      const time = end - start;
      this.data.push({
        amount,
        time
      });
    };
  }

  reset() {
    this.data.length = 0;
  }

  summary() {
    const { label } = this;
    const avg = this.avg().toFixed(2);
    const time = this.time().toFixed(2);
    const amount = this.amount().toFixed(2);

    return `${label}: avg=${avg}ms, total=${time}ms, amount=${amount}`;
  }

  time() {
    return this.data.reduce((acc, { time }) => acc + time, 0);
  }
}