import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Status } from "@/utils";

export class ReloadDirectoryService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: {
    connectSourceService: ConnectSourceService;
    openDirectory: OpenDirectoryService,
  }) {
    this.openDirectory = options.openDirectory;
    this.connectSourceService = options.connectSourceService;
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
      nodes
    } = this.connectSourceService.stateConnectedOrThrow();
    fileSystemAdapter.clear(directory);
    nodes.clear(directory);
    directory.unload();
  }
}