import type { ArtifactOptions } from "@/domain/artifact/artifact";
import type { UpdateDateOptions } from "@/domain/artifact/todo/dater";
import type { Criterion } from "@/domain/artifact/todo/prioritizer";
import type { Progress } from "@/domain/artifact/todo/progressor";
import type { RecurrenceReferenceValue, RecurrenceStepValue, RecurrenceUnitValue } from "@/domain/artifact/todo/recurrer";

import { Artifact } from "@/domain/artifact/artifact";
import { Dater } from "@/domain/artifact/todo/dater";
import { Prioritizer } from "@/domain/artifact/todo/prioritizer";
import { Progressor } from "@/domain/artifact/todo/progressor";
import { Recurrer } from "@/domain/artifact/todo/recurrer";
import { Tagger } from "@/domain/artifact/todo/tagger";
import { throwCritical } from "@/utils";

import type { TodoArtifactState } from "./state";

import { Parser } from "./parser";

export class TodoArtifact extends Artifact implements TodoArtifactState {
  dater?: Dater;
  details: string;
  parser: Parser;
  prioritizer: Prioritizer;
  progressor: Progressor;
  recurrer?: Recurrer;
  tagger: Tagger;

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }

    this.details = "";
    this.parser = new Parser();
    this.prioritizer = new Prioritizer();
    this.progressor = new Progressor();
    this.tagger = new Tagger();
  }

  allDay() {
    return this.dater?.allDay() ?? false;
  }

  clearDates() {
    this.dater = undefined;
    this.recurrer = undefined;
  }

  completed() {
    return this.progressor.completed();
  }

  criteria() {
    return this.prioritizer.criteria();
  }

  criterion(label: string) {
    const criterion = this.prioritizer.criterion(label);
    if (!criterion) {
      throwCritical("TODO_ARTIFACT_HAS_NO_CRITERION");
    }
    return criterion;
  }

  cycleRecurrence() {
    if (!this.hasRecurrence()) throwCritical("TODO_ARTIFACT_HAS_NO_RECURRENCE");

    const currentDue = this.dateDue();
    const currentStart = this.dateStart();
    if (!currentDue || !currentStart) throwCritical("TODO_ARTIFACT_HAS_NO_DATES");

    const { due, start } = this.recurrer.next({ due: currentDue, start: currentStart });
    this.updateDateStart({ allDay: false, date: start });
    this.updateDateDue({ allDay: false, date: due });
  }

  dateDue() {
    return this.dater?.due;
  }

  dateStart() {
    return this.dater?.start;
  }

  disableRecurrence() {
    this.recurrer = undefined;
  }

  hasDates(): this is { dater: Dater } {
    return this.dater !== undefined;
  }

  hasDetails() {
    return this.details.length > 0;
  }

  hasRecurrence(): this is { recurrer: Recurrer } {
    return this.recurrer !== undefined;
  }

  hasTags() {
    return this.tagger.hasTags();
  }

  listTags() {
    return this.tagger.list();
  }

  performFromBinary(binary: ArrayBuffer): void {
    const data = this.parser.convertBinaryToState(binary);
    this.details = data.details;
    this.progressor = data.progressor;
    this.prioritizer = data.prioritizer;
    this.dater = data.dater;
    this.recurrer = data.recurrer;
    this.tagger = data.tagger;
  }

  priority() {
    return this.prioritizer.priority();
  }

  priorityEmpty() {
    return this.prioritizer.empty();
  }

  progress() {
    return this.progressor.progress;
  }

  recurrenceReference() {
    if (!this.recurrer) return undefined;
    return this.recurrer.reference.value;
  }

  recurrenceStep() {
    if (!this.recurrer) return undefined;
    return this.recurrer.step.value;
  }

  recurrenceUnit() {
    if (!this.recurrer) return undefined;
    return this.recurrer.unit.value;
  }

  removeCriterion(label: string) {
    this.prioritizer.remove(label);
  }

  spansOn(options: { end: Date; start: Date }): boolean {
    if (!this.hasDates()) return false;
    return this.dater.spansOn(options);
  }

  tags() {
    return this.tagger.list();
  }

  toBinary(): ArrayBuffer {
    return this.parser.convertDataToBinary({
      dater: this.dater,
      details: this.details,
      prioritizer: this.prioritizer,
      progressor: this.progressor,
      recurrer: this.recurrer,
      tagger: this.tagger,
    });
  }

  uncompleted() {
    return this.progressor.uncompleted();
  }

  updateCriterion(criterion: Criterion) {
    this.prioritizer.update(criterion);
  }

  updateDateDue(options: UpdateDateOptions) {
    if (!this.dater) {
      const { allDay, date: due } = options;
      this.dater = new Dater({ allDay, due });
    } else {
      this.dater.updateDue(options);
    }
  }

  updateDateStart(options: UpdateDateOptions) {
    if (!this.dater) {
      const { allDay, date: start } = options;
      this.dater = new Dater({ allDay, start });
    } else {
      this.dater.updateStart(options);
    }
  }

  updateProgress(progress: Progress) {
    const canRecur = this.hasDates() && this.hasRecurrence();

    const isCurrentUncompleted = this.uncompleted();
    const isNextCompleted = Progressor.completed(progress);
    const willComplete = isCurrentUncompleted && isNextCompleted;

    const willRecur = canRecur && willComplete;
    if (willRecur) {
      this.cycleRecurrence();
      this.progressor.reset();
      return;
    }

    this.progressor.set(progress);
  }

  updateRecurrenceReference(reference: RecurrenceReferenceValue) {
    if (!this.hasDates()) {
      throwCritical("TODO_ARTIFACT_HAS_NO_DATES");
    }
    if (!this.recurrer) {
      this.recurrer = new Recurrer();
    }
    this.recurrer.reference.value = reference;
  }

  updateRecurrenceStep(step: RecurrenceStepValue) {
    if (!this.hasDates()) {
      throwCritical("TODO_ARTIFACT_HAS_NO_DATES");
    }
    if (!this.recurrer) {
      this.recurrer = new Recurrer();
    }
    this.recurrer.step.value = step;
  }

  updateRecurrenceUnit(unit: RecurrenceUnitValue) {
    if (!this.hasDates()) {
      throwCritical("TODO_ARTIFACT_HAS_NO_DATES");
    }
    if (!this.recurrer) {
      this.recurrer = new Recurrer();
    }
    this.recurrer.unit.value = unit;
  }
}
