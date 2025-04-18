import { isJsonParseable, isObjectLike, throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";
import type { Mode } from "./mode";

import { Artifact } from "../artifact";
import { defaultMode, hasMode } from "./mode";

export class TodoArtifact extends Artifact {
  description = "";
  mode: Mode = defaultMode;
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

    if (!isJsonParseable(jsonString)) return;

    const data = JSON.parse(jsonString) as Record<string, unknown>;
    if (!isObjectLike(data)) return;

    if (hasMode(data)) {
      this.mode = data.mode;
    }

    if ("description" in data && typeof data.description === "string") {
      this.description = data.description;
    }
  }

  toBinary(): ArrayBuffer {
    const jsonString = JSON.stringify({ description: this.description, mode: this.mode });
    return this._encoder.encode(jsonString).buffer as ArrayBuffer;
  }

  uncomplete() {
    this.mode = "pending";
  }

  updateDescription(description: string) {
    this.description = description;
  }
}
