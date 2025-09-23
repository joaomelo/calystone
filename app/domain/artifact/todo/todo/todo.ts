import type { ArtifactOptions } from "@/domain/artifact/artifact";
import type { Criterion } from "@/domain/artifact/todo/prioritizer";
import type { Progress } from "@/domain/artifact/todo/progressor";

import { Artifact } from "@/domain/artifact/artifact";
import { Prioritizer } from "@/domain/artifact/todo/prioritizer";
import { Progressor } from "@/domain/artifact/todo/progressor";
import { Scheduler } from "@/domain/schedule";
import { Tagger } from "@/domain/tagger";
import { throwCritical } from "@/utils";

import type { TodoArtifactState } from "./state";

import { Parser } from "./parser";

export class TodoArtifact extends Artifact implements TodoArtifactState {
  details: string;
  parser: Parser;
  prioritizer: Prioritizer;
  progressor: Progressor;
  tagger: Tagger;
  scheduler: Scheduler;

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
    this.scheduler = new Scheduler();
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

  hasCriterion(label: string) {
    return this.prioritizer.has(label);
  }

  hasDetails() {
    return this.details.length > 0;
  }

  performFromBinary(binary: ArrayBuffer): void {
    const data = this.parser.convertBinaryToState(binary);
    this.details = data.details;
    this.progressor = data.progressor;
    this.prioritizer = data.prioritizer;
    this.scheduler = data.scheduler;
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

  removeCriterion(label: string) {
    this.prioritizer.remove(label);
  }

  toBinary(): ArrayBuffer {
    return this.parser.convertDataToBinary({
      details: this.details,
      prioritizer: this.prioritizer,
      progressor: this.progressor,
      scheduler: this.scheduler,
      tagger: this.tagger,
    });
  }

  uncompleted() {
    return this.progressor.uncompleted();
  }

  updateCriterion(criterion: Criterion) {
    this.prioritizer.update(criterion);
  }

  updateProgress(progress: Progress) {
    const canRecur = this.scheduler.hasRecurrence();

    const isCurrentUncompleted = this.uncompleted();
    const isNextCompleted = Progressor.completed(progress);
    const willComplete = isCurrentUncompleted && isNextCompleted;

    const willRecur = canRecur && willComplete;
    if (willRecur) {
      this.scheduler.cycleRecurrence();
      this.progressor.reset();
      return;
    }

    this.progressor.set(progress);
  }
}
