import type { ArtifactOptions } from "@/domain/artifact/artifact";

import { Artifact } from "@/domain/artifact/artifact";
import { throwCritical } from "@/utils";

import type { UpdateDateOptions } from "../dater";
import type { PrioritizerUpdateOptions } from "../prioritizer";
import type { Progress } from "../progressor";
import type {
  ReferenceValue,
  StepValue,
  UnitValue
} from "../recurrer";

import { Parser } from "../parser";
import { Prioritizer } from "../prioritizer";
import { Progressor } from "../progressor";
import { Scheduler } from "../scheduler";
import { Tagger } from "../tagger";

export class TodoArtifact extends Artifact {
  private readonly _parser: Parser;
  private _details: string;
  private _prioritizer: Prioritizer;
  private _progressor: Progressor;
  private _tagger: Tagger;
  private _scheduler: Scheduler;

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }

    this._details = "";
    this._parser = new Parser();
    this._prioritizer = new Prioritizer();
    this._progressor = new Progressor();
    this._tagger = new Tagger();
    this._scheduler = new Scheduler();
  }

  get details() {
    return this._details;
  }

  set details(value: string) {
    this._details = value;
  }

  get start() {
    return this._scheduler.start;
  }

  get end() {
    return this._scheduler.end;
  }

  get allDay() {
    return this._scheduler.allDay;
  }

  get hasDates() {
    return this._scheduler.hasDates();
  }

  get hasRecurrence() {
    return this._scheduler.hasRecurrence();
  }

  get reference() {
    return this._scheduler.reference;
  }

  get step() {
    return this._scheduler.step;
  }

  get unit() {
    return this._scheduler.unit;
  }

  get criteria() {
    return this._prioritizer.criteria;
  }

  get tags() {
    return this._tagger.list;
  }

  get progress() {
    return this._progressor.progress;
  }

  get completed() {
    return this._progressor.completed;
  }

  get uncompleted() {
    return this._progressor.uncompleted;
  }

  performFromBinary(binary: ArrayBuffer): void {
    const data = this._parser.convertBinaryToState(binary);

    this._details = data.details;
    this._progressor = data.progressor;
    this._prioritizer = data.prioritizer;
    this._scheduler = data.scheduler;
    this._tagger = data.tagger;
  }

  toBinary(): ArrayBuffer {
    return this._parser.convertDataToBinary({
      details: this._details,
      prioritizer: this._prioritizer,
      progressor: this._progressor,
      scheduler: this._scheduler,
      tagger: this._tagger,
    });
  }

  spansOn(options: {
    end: Date;
    start: Date
  }) {
    return this._scheduler.spansOn(options);
  }

  clearDates() {
    this._scheduler.clearDates();
  }

  clearRecurrence() {
    this._scheduler.clearRecurrence();
  }

  makeAllDay() {
    this._scheduler.makeAllDay();
  }

  updateStart(options: UpdateDateOptions) {
    this._scheduler.updateStart(options);
  }

  updateEnd(options: UpdateDateOptions) {
    this._scheduler.updateEnd(options);
  }

  updateReference(reference: ReferenceValue) {
    this._scheduler.updateReference(reference);
  }

  updateStep(step: StepValue) {
    this._scheduler.updateStep(step);
  }

  updateUnit(unit: UnitValue) {
    this._scheduler.updateUnit(unit);
  }

  criterion(label: string) {
    return this._prioritizer.criterion(label);
  }

  criterionOrThrow(label: string) {
    return this._prioritizer.criterionOrThrow(label);
  }

  updateCriterion(prioritizerUpdateOptions: PrioritizerUpdateOptions) {
    this._prioritizer.update(prioritizerUpdateOptions);
  }

  removeCriterion(label: string) {
    this._prioritizer.remove(label);
  }

  updateProgress(progress: Progress) {
    const canRecur = this._scheduler.hasRecurrence();

    const isCurrentUncompleted = this._progressor.uncompleted;
    const isNextCompleted = Progressor.completed(progress);
    const willComplete = isCurrentUncompleted && isNextCompleted;

    const willRecur = canRecur && willComplete;
    if (willRecur) {
      this._scheduler.cycleRecurrence();
      this._progressor.reset();
      return;
    }

    this._progressor.set(progress);
  }

}
