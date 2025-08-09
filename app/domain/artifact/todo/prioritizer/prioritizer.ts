import type {
  Criteria,
  Criterion
} from "./criteria";

export class Prioritizer {
  private readonly state: Criteria;

  constructor(criteria?: Criteria) {
    this.state = criteria ?? [];
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

  criteria() {
    return this.state;
  }

  criterion(label: string) {
    const criterion = this.state.find((c) => c.label === label);
    return criterion;
  }

  empty() {
    return this.state.length === 0;
  }

  has(label: string) {
    return this.state.some((c) => c.label === label);
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

  patch(criteria: Criteria) {
    for (const criterion of criteria) {
      const index = this.state.findIndex((c) => c.label === criterion.label);
      if (index !== -1) {
        this.state[index] = criterion;
      } else {
        this.state.push(criterion);
      }
    }
  }

  priority() {
    if (this.state.length === 0) return 0;

    const sum = this.state.reduce((sum, criterion) => sum + criterion.value, 0);
    const average = sum / this.state.length;
    return average;
  }

  remove(label: string) {
    const index = this.state.findIndex((c) => c.label === label);
    if (index !== -1) {
      this.state.splice(index, 1);
    }
  }

  update(criterion: Criterion) {
    const index = this.state.findIndex((c) => c.label === criterion.label);
    if (index !== -1) {
      this.state[index] = criterion;
    } else {
      this.state.push(criterion);
    }
  }

}
