import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { UpdateDateOptions } from "./dates";

import { Artifact } from "../artifact";
import { Dates } from "./dates";
import { parseString, stringifyData } from "./parse";
import { Progressor } from "./progress";

export class TodoArtifact extends Artifact {
  dates = new Dates();
  details = "";
  importance = 0;
  progressor: Progressor = new Progressor();
  urgency = 0;
  private _decoder = new TextDecoder("utf-8");
  private _encoder = new TextEncoder();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
  }

  completed(): boolean {
    return this.progressor.completed();
  }

  done() {
    this.progressor.done();
  }

  dueDate() {
    return this.dates.due;
  }

  performFromBinary(binary: ArrayBuffer): void {
    const jsonString = this._decoder.decode(binary);

    const { details, dueDate, importance, progress, startDate, urgency } = parseString(jsonString);

    if (progress) {
      this.progressor = new Progressor(progress);
    }

    if (details) {
      this.updateDetails(details);
    }

    if (importance) {
      this.updateImportance(importance);
    }

    if (urgency) {
      this.updateUrgency(urgency);
    }

    if (startDate !== undefined) {
      this.updateStartDate({ anchor: false, date: startDate });
    }

    if (dueDate !== undefined) {
      this.updateDueDate({ anchor: false, date: dueDate });
    }
  }

  reopen() {
    this.progressor.reopen();
  }

  skip() {
    this.progressor.skip();
  }

  startDate() {
    return this.dates.start;
  }

  toBinary(): ArrayBuffer {
    const jsonString = stringifyData({
      details: this.details,
      dueDate: this.dates.due,
      importance: this.importance,
      progress: this.progressor.progress,
      startDate: this.dates.start,
      urgency: this.urgency
    });
    return this._encoder.encode(jsonString).buffer as ArrayBuffer;
  }

  uncompleted(): boolean {
    return this.progressor.uncompleted();
  }

  updateDetails(details: string) {
    this.details = details;
  }

  updateDueDate(options: UpdateDateOptions) {
    this.dates.updateDue(options);
  }

  updateImportance(importance = 0) {
    this.importance = importance;
  }

  updateStartDate(options: UpdateDateOptions) {
    this.dates.updateStart(options);
  }

  updateUrgency(urgency = 0) {
    this.urgency = urgency;
  }
}
