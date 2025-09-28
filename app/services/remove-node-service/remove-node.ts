import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

export class RemoveNodeService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor({
    connectSourceService,
    spawnCollectionsService,
  }: {
    connectSourceService: ConnectSourceService;
    spawnCollectionsService: SpawnCollectionsService;
  }) {
    this.connectSourceService = connectSourceService;
    this.spawnCollectionsService = spawnCollectionsService;
  }

  private inject() {
    const mover = this.spawnCollectionsService.mover();
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    return {
      fileSystemAdapter,
      mover
    };
  }

  async remove(node: Node): Promise<void> {
    const {
      fileSystemAdapter,
      mover
    } = this.inject();
    await fileSystemAdapter.remove(node);
    mover.remove(node);
  }

  removeable(node: Node) {
    const { fileSystemAdapter } = this.inject();
    return fileSystemAdapter.removeable(node);
  }

}