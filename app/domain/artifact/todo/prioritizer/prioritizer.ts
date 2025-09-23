import {
  asArray,
  comparator,
  compareBy,
  reverse
} from "@/utils";

import type { Criterion } from "./criterion";

export class Prioritizer {

  static compare(a: Prioritizer, b: Prioritizer): number {
    const compareByPrioritySmallFirst = compareBy<Prioritizer, number>({
      nulls: "last",
      select: (prioritizer: Prioritizer) => prioritizer.priority,
    });
    const compareByPriority = reverse(compareByPrioritySmallFirst);

    const compareBySize = compareBy<Prioritizer, number>({
      nulls: "last",
      select: (prioritizer: Prioritizer) => prioritizer.size,
    });

    const compare = comparator(compareByPriority, compareBySize);

    return compare(a, b);
  }

  private readonly _criteria = new Map<string, Criterion>();

  constructor(criteria?: Criterion[]) {
    this.update(criteria);
  }

  get priority() {
    if (this.empty) return 0;

    const sum = this.criteria.reduce((sum, criterion) => sum + criterion.value, 0);
    const average = sum / this.size;
    return average;
  }

  get criteria() {
    return Array.from(this._criteria.values());
  }

  get size() {
    return this._criteria.size;
  }

  get empty() {
    return this.size === 0;
  }

  criterion(label: string) {
    return this._criteria.get(label);
  }

  has(label: string) {
    return this._criteria.has(label);
  }

  update(criterionOrCriteria: Criterion | Criterion[] = []) {
    const criteria = asArray(criterionOrCriteria);
    for (const criterion of criteria) {
      this._criteria.set(criterion.label, criterion);
    }
  }

  remove(label: string) {
    this._criteria.delete(label);
  }

}
