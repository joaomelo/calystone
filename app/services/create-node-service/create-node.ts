import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service/connect";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

export class CreateNodeService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly openDirectory: OpenDirectoryService;
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor(options: {
    connectSourceService: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    openDirectory: OpenDirectoryService,
    spawnCollectionsService: SpawnCollectionsService
  }) {
    this.connectSourceService = options.connectSourceService;
    this.exchangeArtifact = options.exchangeArtifact;
    this.openDirectory = options.openDirectory;
    this.spawnCollectionsService = options.spawnCollectionsService;
  }

  async createArtifact(options: {
    name: string,
    parent: Directory
  }): Promise<void> {
    return this.createNode({
      ...options,
      type: "artifact"
    });
  }

  async createDirectory(options: {
    name: string,
    parent: Directory
  }): Promise<void> {
    return this.createNode({
      ...options,
      type: "directory"
    });
  }

  async createNode(options: {
    name: string,
    parent: Directory
    type: "artifact" | "directory"
  }): Promise<void> {
    const creatable = this.creatable(options);
    creatable.throwOnFail();

    const { parent } = options;
    const {
      creator,
      fileSystemAdapter
    } = this.inject();

    try {
      parent.busy();
      await this.openDirectory.open(parent);
      if (options.type === "artifact") {
        const artifactOptions = await fileSystemAdapter.createArtifact(options);
        const artifact = creator.create(artifactOptions);
        await this.exchangeArtifact.fetchInto(artifact);
      } else {
        const directoryOptions = await fileSystemAdapter.createDirectory(options);
        const directory = creator.create(directoryOptions);
        await this.openDirectory.open(directory);
      }
    } finally {
      parent.idle();
    }
  }

  creatable({
    name,
    parent
  }: {
    name: string,
    parent: Directory
  }) {
    const { creator } = this.inject();
    const creatableDomain = creator.creatable({
      name,
      parent
    });
    return creatableDomain;
  }

  private inject() {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    const creator = this.spawnCollectionsService.creator();
    return {
      creator,
      fileSystemAdapter
    };
  }
}