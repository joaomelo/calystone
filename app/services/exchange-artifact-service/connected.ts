import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwCritical, throwError } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class ConnectedExchangeArtifactService implements ExchangeArtifactService {
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetchInto(artifact: Artifact) {
    artifact.busy();
    try {
      const content = await this.fileSystemAdapter.fetchFileContent(artifact.id);
      artifact.fromBinary(content);
      artifact.load();
    } catch (error) {
      artifact.unload();
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    } finally {
      artifact.idle();
    }
  }

  async postFrom(artifact: Artifact) {
    const content = artifact.toBinary();
    if (!content) throwCritical("ARTIFACT_UNLOADED");

    await this.fileSystemAdapter.postFileContent({ content, id: artifact.id });
  }
}