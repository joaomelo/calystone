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

    const aHasMorePriority = priorityA > priorityB;
    const aComesBeforeB = -1;
    if (aHasMorePriority) return aComesBeforeB;

    const aHasLessPriority = priorityA < priorityB;
    const aComesAfterB = 1;
    if (aHasLessPriority) return aComesAfterB;

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
