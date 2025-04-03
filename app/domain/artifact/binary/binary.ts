import { Artifact } from "../artifact";

export class BinaryArtifact extends Artifact {
  content?: ArrayBuffer;

  performFromBinary(binary: ArrayBuffer): void {
    this.content = binary;
  }

  toBinary(): ArrayBuffer | undefined {
    return this.content;
  }
}
