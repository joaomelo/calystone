import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";
import { throwError } from "@/utils";

import type { OpenDirectoryService } from "../open-directory-service";

export class CreateDirectoryService {
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: { nodes: Nodes, openDirectory: OpenDirectoryService }) {
    const { nodes, openDirectory } = options;
    this.nodes = nodes;
    this.openDirectory = openDirectory;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const fileSystemAdapter = this.inject();
    const { parent } = options;

    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const data = await fileSystemAdapter.createDirectory(options);
      const directory = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(directory);
      await this.openDirectory.open(directory);
    } finally {
      parent.idle();
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