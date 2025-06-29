import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service/connect";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { createNode } from "@/domain";

export class CreateDirectoryService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: { connectSourceService: ConnectSourceService, openDirectory: OpenDirectoryService }) {
    this.connectSourceService = options.connectSourceService;
    this.openDirectory = options.openDirectory;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { fileSystemAdapter, nodes } = this.connectSourceService.stateConnectedOrThrow();
    const { parent } = options;

    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const directoryOptions = await fileSystemAdapter.createDirectory(options);
      const directory = createNode(directoryOptions);
      nodes.set(directory);
      await this.openDirectory.open(directory);
    } finally {
      parent.idle();
    }
  }
}