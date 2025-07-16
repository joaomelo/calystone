import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service/connect";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { createNode } from "@/domain";

export class CreateArtifactService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: {
    connectSourceService: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    openDirectory: OpenDirectoryService
  }) {
    this.connectSourceService = options.connectSourceService;
    this.exchangeArtifact = options.exchangeArtifact;
    this.openDirectory = options.openDirectory;
  }

  async create(options: {
    name: string,
    parent: Directory
  }): Promise<void> {
    const {
      fileSystemAdapter,
      nodes
    } = this.connectSourceService.stateConnectedOrThrow();
    const { parent } = options;
    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const artifactOptions = await fileSystemAdapter.createArtifact(options);
      const artifact = createNode(artifactOptions);
      nodes.set(artifact);
      await this.exchangeArtifact.fetchInto(artifact);
    } finally {
      parent.idle();
    }
  }
}