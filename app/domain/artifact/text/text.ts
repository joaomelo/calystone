import { throwCritical } from "@/utils";

import type { ArtifactOptions } from "../artifact";

import { Artifact } from "../artifact";

export class TextArtifact extends Artifact {
  content: string;
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();

  constructor(options: ArtifactOptions) {
    super(options);
    if (this.mime.type() !== "text") {
      throwCritical("INVALID_MIME_TYPE");
    }
    this.content = "";
  }

  performFromBinary(binary: ArrayBuffer): void {
    this.content = this.decoder.decode(binary);
  }

  toBinary(): ArrayBuffer {
    return this.encoder.encode(this.content).buffer as ArrayBuffer;
  }
}
