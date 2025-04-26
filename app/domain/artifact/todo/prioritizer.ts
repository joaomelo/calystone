export class Prioritizer {
  importance = 0;
  urgency = 0;

  constructor(options?: { importance?: number, urgency?: number }) {
    const { importance = 0, urgency = 0 } = options ?? {};

    this.importance = importance;
    this.urgency = urgency;
  }

  static compare(a: Prioritizer, b: Prioritizer): number {
    const priorityA = a.priority();
    const priorityB = b.priority();

    if (priorityA < priorityB) return -1;
    if (priorityA > priorityB) return 1;
    return 0;
  }

  compareTo(other: Prioritizer): number {
    return Prioritizer.compare(this, other);
  }

  isEqualTo(other: Prioritizer): boolean {
    return this.compareTo(other) === 0;
  }

  isGreaterThan(other: Prioritizer): boolean {
    return this.compareTo(other) > 0;
  }

  isLessThan(other: Prioritizer): boolean {
    return this.compareTo(other) < 0;
  }

  priority() {
    return this.importance * this.urgency;
  }
}
