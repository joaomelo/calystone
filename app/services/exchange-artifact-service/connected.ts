import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwError } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class ConnectedExchangeArtifactService implements ExchangeArtifactService {
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetchInto(artifact: Artifact) {
    artifact.busy();
    try {
      const content = await this.fileSystemAdapter.fetchContent(artifact.id);
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
    await this.fileSystemAdapter.postContent({ content, id: artifact.id });
  }
}