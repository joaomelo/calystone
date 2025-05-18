import type { Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";
import type { EnsureDescriptorService } from "@/services/ensure-descriptor";

import { createNode, Directory } from "@/domain";
import { throwError } from "@/utils";

export class OpenDirectoryService {
  private readonly ensureDescriptor: EnsureDescriptorService;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(options: {
    ensureDescriptor: EnsureDescriptorService,
    nodes: Nodes
  }) {
    const { ensureDescriptor, nodes } = options;
    this.ensureDescriptor = ensureDescriptor;
    this.nodes = nodes;
  }

  async open(directory: Directory) {
    if (directory.isLoaded()) return;

    const fileSystemAdapter = this.inject();

    directory.busy();
    try {
      const nodesData = await fileSystemAdapter.open(directory);
      for (const data of nodesData) {
        const node = createNode({ nodes: this.nodes, ...data });
        this.nodes.set(node);
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
    for (const node of this.nodes.list()) {
      if (!node.isRoot()) continue;
      if (!(node instanceof Directory)) continue;
      if (node.isLoaded()) continue;

      await this.open(node);
    }
  }

  provide(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    return this.fileSystemAdapter;
  }
}