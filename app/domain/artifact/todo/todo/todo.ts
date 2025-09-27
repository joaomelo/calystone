import type { ArtifactOptions } from "@/domain/artifact/artifact";

import { Artifact } from "@/domain/artifact/artifact";
import { throwCritical } from "@/utils";

import type { Progress } from "../progressor";

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
