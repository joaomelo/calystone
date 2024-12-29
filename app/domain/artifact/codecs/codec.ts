import { throwCritical } from "@/utils";

import type { Artifact } from "../artifact";

export abstract class Codec<T> {
  artifact: Artifact;

  constructor(artifact: Artifact) {
    this.artifact = artifact;
  }

  abstract decode(content: ArrayBuffer): T;
  abstract encode(content: T): ArrayBuffer;

  async fetch(): Promise<T> {
    if (!this.artifact.content) {
      await this.artifact.load();
    }
    if (!this.artifact.content) {
      throwCritical("UNABLE_TO_FETCH_ARTIFACT_CONTENT", "the codec was unable to fetch the artifact content");
    }
    return this.decode(this.artifact.content);
  }

  async post(content: T): Promise<void> {
    await this.artifact.post(this.encode(content));
  }
}
