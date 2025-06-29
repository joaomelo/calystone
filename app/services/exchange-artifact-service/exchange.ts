import type { Artifact } from "@/domain";

import { throwError } from "@/utils";

import type { ConnectSourceService } from "../connect-source-service/connect";

export class ExchangeArtifactService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  async fetchInto(artifact: Artifact) {
    if (artifact.isLoaded()) return;

    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();

    artifact.busy();
    try {
      const content = await fileSystemAdapter.fetchContent(artifact);
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
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    await fileSystemAdapter.postContent(artifact);
  }
}