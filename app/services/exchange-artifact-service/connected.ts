import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwCritical, throwError } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class ConnectedExchangeArtifactService implements ExchangeArtifactService {
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetch(artifact: Artifact) {
    if (artifact.mime.type() !== "text") throwCritical("NOT_TEXT_ARTIFACT", "cannot fetch text content if artifact is not of text type");

    artifact.busy();
    try {
      const content = artifact.toBinary() ?? await this.fileSystemAdapter.fetchFileContent(artifact.id);
      artifact.fromBinary(content);
      artifact.load();
      return content;
    } catch (error) {
      artifact.unload();
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    } finally {
      artifact.idle();
    }
  }

  async post(options: { artifact: Artifact, content: ArrayBuffer }) {
    const { artifact, content } = options;
    artifact.fromBinary(content);
    await this.fileSystemAdapter.postFileContent({ content, id: artifact.id });
  }
}