import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";

import type { DirectoryOpenService } from "../directory-open-service/open";
import type { CreateDirectoryService } from "./create-directory";

export class ConnectedCreateDirectoryService implements CreateDirectoryService {
  private readonly directoryOpen: DirectoryOpenService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(options: { directoryOpen: DirectoryOpenService; fileSystemAdapter: FileSystemAdapter, nodes: Nodes }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
    this.directoryOpen = options.directoryOpen;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;

    try {
      parent.busy();
      await this.directoryOpen.open(parent);
      const data = await this.fileSystemAdapter.createDirectory(options);
      const directory = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(directory);
      await this.directoryOpen.open(directory);
    } finally {
      parent.idle();
    }

  }

}