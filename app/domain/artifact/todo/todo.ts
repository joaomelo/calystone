import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { Mode } from "./mode";

import { Artifact } from "../artifact";
import { defaultMode } from "./mode";
import { parseJsonString } from "./parse";

export class TodoArtifact extends Artifact {
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

  performFromBinary(binary: ArrayBuffer): void {
    const jsonString = this._decoder.decode(binary);

    const { details, importance, mode, urgency, } = parseJsonString(jsonString);

    if (mode) {
      this.mode = mode;
    }

    if (details) {
      this.details = details;
    }

    if (importance) {
      this.importance = importance;
    }

    if (urgency) {
      this.urgency = urgency;
    }
  }

  toBinary(): ArrayBuffer {
    const jsonString = JSON.stringify({ details: this.details, importance: this.importance, mode: this.mode, urgency: this.urgency });
    return this._encoder.encode(jsonString).buffer as ArrayBuffer;
  }

  uncomplete() {
    this.mode = "pending";
  }

  updateDetails(details: string) {
    this.details = details;
  }

  updateImportance(importance = 0) {
    this.importance = importance;
  }

  updateUrgency(urgency = 0) {
    this.urgency = urgency;
  }
}
