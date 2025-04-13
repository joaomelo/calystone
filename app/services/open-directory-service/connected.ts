import type { Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";
import type { EnsureDescriptorService } from "@/services/ensure-descriptor";

import { createNode, Directory } from "@/domain";
import { throwError } from "@/utils";

import type { OpenDirectoryService } from "./open";

export class ConnectedOpenDirectoryService implements OpenDirectoryService {
  private readonly ensureDescriptor: EnsureDescriptorService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(options: {
    ensureDescriptor: EnsureDescriptorService,
    fileSystemAdapter: FileSystemAdapter,
    nodes: Nodes
  }) {
    const { ensureDescriptor, fileSystemAdapter, nodes } = options;
    this.ensureDescriptor = ensureDescriptor;
    this.fileSystemAdapter = fileSystemAdapter;
    this.nodes = nodes;
  }

  async open(directory: Directory) {
    if (directory.isLoaded()) return;

    directory.busy();

    try {
      const nodesData = await this.fileSystemAdapter.open(directory);
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
}