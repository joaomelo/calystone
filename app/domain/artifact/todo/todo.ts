import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { Mode } from "./mode";

import { Artifact } from "../artifact";
import { defaultMode } from "./mode";
import { parseJsonString } from "./parse";

export class TodoArtifact extends Artifact {
  details = "";
  dueDate: Date | null = null;
  importance = 0;
  mode: Mode = defaultMode;
  startDate: Date | null = null;
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
      this.updateStartDate(startDate);
    }

    if (dueDate !== undefined) {
      this.updateDueDate(dueDate);
    }
  }

  toBinary(): ArrayBuffer {
    const jsonString = JSON.stringify({
      details: this.details,
      dueDate: this.dueDate?.toISOString() ?? null,
      importance: this.importance,
      mode: this.mode,
      startDate: this.startDate?.toISOString() ?? null,
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

  updateDueDate(due: Date | null) {
    this.dueDate = due;
    if (due === null) {
      this.startDate = due;
    }
  }

  updateImportance(importance = 0) {
    this.importance = importance;
  }

  updateStartDate(start: Date | null) {
    this.startDate = start;
    if (this.dueDate === null) {
      this.dueDate = start;
    }
  }

  updateUrgency(urgency = 0) {
    this.urgency = urgency;
  }
}
