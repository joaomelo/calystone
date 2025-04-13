import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";

import type { OpenDirectoryService } from "../open-directory-service/open";
import type { CreateDirectoryService } from "./create-directory";

export class ConnectedCreateDirectoryService implements CreateDirectoryService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes; openDirectory: OpenDirectoryService; }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
    this.openDirectory = options.openDirectory;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;

    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const data = await this.fileSystemAdapter.createDirectory(options);
      const directory = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(directory);
      await this.openDirectory.open(directory);
    } finally {
      parent.idle();
    }

  }

}