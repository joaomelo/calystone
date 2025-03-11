import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwCritical, throwError } from "@/utils";

import type { ArtifactTextService } from "./text";

export class ConnectedArtifactTextService implements ArtifactTextService {
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetch(artifact: Artifact) {
    if (artifact.mime.type() !== "text") throwCritical("NOT_TEXT_ARTIFACT", "cannot fetch text content if artifact is not of text type");

    artifact.status = "loading";
    try {
      const content = artifact.content ?? await this.fileSystemAdapter.fetchFileContent(artifact.id);
      artifact.content = content;
    } catch (error) {
      artifact.status = "unloaded";
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    }

    artifact.status = "loaded";
    return this.decoder.decode(artifact.content);
  }

  async post({ artifact, text }: { artifact: Artifact, text: string }) {
    const content: ArrayBuffer = this.encoder.encode(text).buffer as ArrayBuffer;
    artifact.content = content;
    await this.fileSystemAdapter.postFileContent({ content, id: artifact.id });
  }

}