import type { Compare } from "@/utils";

import {
  asArray,
  comparator,
  compareBy,
  reverse,
  throwCritical
} from "@/utils";

import type { CriterionOptions } from "./criterion-options";

import { Criterion } from "./criterion";

export type PrioritizerUpdateOptions = Criterion | Criterion[] | CriterionOptions | CriterionOptions[];

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

  static createCompareByCriterion(label: string): Compare<Prioritizer> {
    return compareBy<Prioritizer, Criterion>({
      compare: (a, b) => Criterion.compareByValue(a, b),
      select: (prioritizer: Prioritizer) => prioritizer.criterion(label) ?? new Criterion({ label }),
    });
  }

  private readonly _criteria = new Map<string, Criterion>();

  constructor(options?: PrioritizerUpdateOptions) {
    this.update(options);
  }

  get priority() {
    if (this.empty) return 0;

    const sum = this.criteria.reduce((sum, criterion) => sum + criterion.value, 0);
    const average = sum / this.size;
    return average;
  }

  get criteria() {
    const list = Array.from(this._criteria.values());
    return list.sort((a, b) => Criterion.compareByLabel(a, b));
  }

  get labels() {
    return this.criteria.map(criterion => criterion.label);
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

  criterionOrThrow(label: string) {
    const criterion = this.criterion(label);
    if (!criterion) {
      throwCritical("CRITERION_NOT_FOUND");
    }
    return criterion;
  }

  has(label: string) {
    return this._criteria.has(label);
  }

  update(singleOrManyOptions: PrioritizerUpdateOptions = []) {
    const manyOptions = asArray(singleOrManyOptions);
    for (const singleOptions of manyOptions) {
      const criterion = Criterion.create(singleOptions);
      this._criteria.set(criterion.label, criterion);
    }
  }

  remove(label: string) {
    this._criteria.delete(label);
  }

  clear() {
    this._criteria.clear();
  }

  difference(options: Prioritizer | PrioritizerUpdateOptions): Prioritizer {
    const other = options instanceof Prioritizer
      ? options
      : new Prioritizer(options);

    const myCriteria = this.criteria;
    const criteriaThisHasButOhterDont = myCriteria.filter((criterion) => !other.has(criterion.label));

    return new Prioritizer(criteriaThisHasButOhterDont);
  }
}
