import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

export class RenameNodeService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor(options: {
    connectSourceService: ConnectSourceService,
    spawnCollectionsService: SpawnCollectionsService
  }) {
    this.connectSourceService = options.connectSourceService;
    this.spawnCollectionsService = options.spawnCollectionsService;
  }

  async rename(options: {
    name: string,
    node: Node
  }): Promise<void> {
    const renameable = this.renameable(options);
    renameable.throwOnFail();

    const {
      fileSystemAdapter,
      renamer,
    } = this.inject();

    renamer.rename(options);
    await fileSystemAdapter.rename(options);
  }

  renameable({
    name,
    node
  }: {
    name?: string
    node: Node,
  }) {
    const {
      fileSystemAdapter,
      renamer
    } = this.inject();
    const fileSystemRenameable = fileSystemAdapter.renameable(node);
    if (!name) return fileSystemRenameable;

    const domainRenamable = renamer.renameable({
      name,
      node
    });

    return fileSystemRenameable.merge(domainRenamable);
  }

  private inject() {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    const renamer = this.spawnCollectionsService.renamer();
    return {
      fileSystemAdapter,
      renamer
    };
  }
}