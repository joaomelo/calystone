export class Tracker {
  private readonly data: number[] = [];
  private readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  avg() {
    if (this.iterations() === 0) return 0;
    return parseFloat((this.total() / this.iterations()).toFixed(2));
  }

  iterations() {
    return this.data.length;
  }

  record() {
    const start = performance.now();

    return () => {
      const end = performance.now();
      this.data.push(end - start);
    };
  }

  reset() {
    this.data.length = 0;
  }

  summary() {
    return `${this.label}: avg=${this.avg().toString()}s, total=${this.total().toString()}s, iterations=${this.iterations().toString()}`;
  }

  total() {
    const total = this.data.reduce((acc, time) => acc + time, 0);
    return parseFloat((total / 1000).toFixed(2));
  }
}