import { isJsonParseable, throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";

import { Artifact } from "../artifact";

export class TodoArtifact extends Artifact {
  content: Record<string, unknown>;
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.media() !== "application/todo") {
      throwCritical("INVALID_MIME_TYPE");
    }
    this.content = {};
  }

  performFromBinary(binary: ArrayBuffer): void {
    const jsonString = this.decoder.decode(binary);

    if (!isJsonParseable(jsonString)) {
      this.content = {};
      return;
    }

    this.content = JSON.parse(jsonString) as Record<string, unknown>;
  }

  toBinary(): ArrayBuffer {
    const jsonString = JSON.stringify(this.content);
    return this.encoder.encode(jsonString).buffer as ArrayBuffer;
  }
}
