import type { ConnectSourceService } from "@/services/connect-source-service";
import type { EnsureDescriptorService } from "@/services/ensure-descriptor-service";

import { createNode, Directory } from "@/domain";
import { throwError } from "@/utils";

export class OpenDirectoryService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly ensureDescriptor: EnsureDescriptorService;

  constructor(options: { connectSourceService: ConnectSourceService; ensureDescriptor: EnsureDescriptorService, }) {
    this.ensureDescriptor = options.ensureDescriptor;
    this.connectSourceService = options.connectSourceService;
  }

  async open(directory: Directory) {
    const {
      fileSystemAdapter,
      nodes
    } = this.connectSourceService.stateConnectedOrThrow();

    if (directory.isLoaded()) return;

    directory.busy();
    try {
      const nodesOptions = await fileSystemAdapter.open(directory);
      for (const nodeOptions of nodesOptions) {
        const node = createNode(nodeOptions);
        nodes.set(node);
      }
      directory.load();
      await this.ensureDescriptor.ensure(directory);
    } catch (error) {
      directory.unload();
      throwError("UNABLE_TO_OPEN_DIRECTORY", error);
    } finally {
      directory.idle();
    }
  }

  async openRoots() {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    for (const node of nodes.list()) {
      if (!node.isRoot()) continue;
      if (!(node instanceof Directory)) continue;
      if (node.isLoaded()) continue;

      await this.open(node);
    }
  }
}