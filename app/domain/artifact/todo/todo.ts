import type { RecurrenceReferenceValue, RecurrenceStepValue, RecurrenceUnitValue } from "@/domain/artifact/recurrer";

import { Recurrer } from "@/domain/artifact/recurrer";
import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { TodoArtifactState } from "./state";

import { Artifact } from "../artifact";
import { Dater, type UpdateDateOptions } from "./dater";
import { Parser } from "./parser";
import { Prioritizer } from "./prioritizer";
import { Progressor } from "./progressor";
import { Tagger } from "./tagger";

export class TodoArtifact extends Artifact implements TodoArtifactState {
  dater? = new Dater();
  details = "";
  parser = new Parser();
  prioritizer = new Prioritizer();
  progressor = new Progressor();
  recurrer?: Recurrer;
  tagger = new Tagger();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
  }

  clearDates() {
    this.dater = undefined;
    this.recurrer = undefined;
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

  hasDates() {
    return this.dater !== undefined;
  }

  hasRecurrence() {
    return this.recurrer !== undefined;
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

  updateDateDue(options: UpdateDateOptions) {
    if (!this.dater) {
      this.dater = new Dater();
    }
    this.dater.updateDue(options);
  }

  updateDateStart(options: UpdateDateOptions) {
    if (!this.dater) {
      this.dater = new Dater();
    }
    this.dater.updateStart(options);
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
