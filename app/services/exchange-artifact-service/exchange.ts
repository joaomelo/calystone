import type { Artifact } from "@/domain";

import { throwError } from "@/utils";

import type { ConnectSourceService } from "../connect-source-service/connect";

export class ExchangeArtifactService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  private inject() {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    return fileSystemAdapter;
  }

  async fetchInto(artifact: Artifact) {
    if (artifact.isLoaded()) return;

    const fileSystemAdapter = this.inject();

    artifact.busy();
    try {
      const content = await fileSystemAdapter.fetchContent(artifact);
      artifact.fromBinary(content);
    } catch (error) {
      artifact.unload();
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    } finally {
      artifact.idle();
    }
  }

  async postFrom(artifact: Artifact) {
    artifact.busy();
    try {
      const fileSystemAdapter = this.inject();
      await fileSystemAdapter.postContent(artifact);
    } finally {
      artifact.idle();
    }
  }
}