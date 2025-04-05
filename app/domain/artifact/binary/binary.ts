import { throwCritical } from "@/utils";

import { Artifact } from "../artifact";

export class BinaryArtifact extends Artifact {
  content?: ArrayBuffer;

  performFromBinary(binary: ArrayBuffer): void {
    this.content = binary;
  }

  toBinary(): ArrayBuffer {
    if (!this.content) throwCritical("ARTIFACT_UNLOADED");
    return this.content;
  }
}
