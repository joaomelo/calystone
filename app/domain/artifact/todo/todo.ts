import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { UpdateDateOptions } from "./dates";
import type { Mode } from "./mode";

import { Artifact } from "../artifact";
import { Dates } from "./dates";
import { defaultMode } from "./mode";
import { parseJsonString } from "./parse";

export class TodoArtifact extends Artifact {
  dates = new Dates();
  details = "";
  importance = 0;
  mode: Mode = defaultMode;
  urgency = 0;
  private _decoder = new TextDecoder("utf-8");
  private _encoder = new TextEncoder();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
  }

  complete() {
    this.mode = "done";
  }

  completed(): boolean {
    return this.mode === "done";
  }

  dueDate() {
    return this.dates.due;
  }

  performFromBinary(binary: ArrayBuffer): void {
    const jsonString = this._decoder.decode(binary);

    const { details, dueDate, importance, mode, startDate, urgency } = parseJsonString(jsonString);

    if (mode) {
      this.mode = mode;
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

  startDate() {
    return this.dates.start;
  }

  toBinary(): ArrayBuffer {
    const jsonString = JSON.stringify({
      details: this.details,
      dueDate: this.dates.stringifiableDue(),
      importance: this.importance,
      mode: this.mode,
      startDate: this.dates.stringifiableStart(),
      urgency: this.urgency
    });
    return this._encoder.encode(jsonString).buffer as ArrayBuffer;
  }

  uncomplete() {
    this.mode = "pending";
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
