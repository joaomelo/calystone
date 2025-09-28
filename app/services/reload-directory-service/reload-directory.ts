import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

import { Status } from "@/utils";

export class ReloadDirectoryService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly openDirectory: OpenDirectoryService;
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor({
    connectSourceService,
    openDirectory,
    spawnCollectionsService,
  }: {
    connectSourceService: ConnectSourceService;
    openDirectory: OpenDirectoryService,
    spawnCollectionsService: SpawnCollectionsService;
  }) {
    this.openDirectory = openDirectory;
    this.connectSourceService = connectSourceService;
    this.spawnCollectionsService = spawnCollectionsService;
  }

  private inject() {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    const mover = this.spawnCollectionsService.mover();
    return {
      fileSystemAdapter,
      mover
    };
  }

  async reload(directory: Directory) {
    const reloadable = this.reloadable(directory);
    reloadable.throwOnFail();

    this.unload(directory);
    await this.openDirectory.open(directory);
  }

  reloadable(directory: Directory) {
    if (!directory.isLoaded()) return Status.fail("DIRECTORY_NOT_LOADED");
    return Status.ok();
  }

  private unload(directory: Directory) {
    const {
      fileSystemAdapter,
      mover
    } = this.inject();

    fileSystemAdapter.clear(directory);
    mover.clear(directory);
    directory.unload();
  }
}