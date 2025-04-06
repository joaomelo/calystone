import type { Directory, Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { createNode } from "@/domain";
import { Status } from "@/utils";

import type { DirectoryOpenService } from "../directory-open-service/open";
import type { CreateDirectoryService } from "./create-directory";

export class ConnectedCreateDirectoryService implements CreateDirectoryService {
  private readonly directoryOpen: DirectoryOpenService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { directoryOpen: DirectoryOpenService; fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter, }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
    this.directoryOpen = options.directoryOpen;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;

    const createable = this.createbleOn(parent);
    createable.throwOnFail();

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

  createbleOn(parent: Node): Status {
    const supportable = this.supportAdapter.createDirectory();
    if (supportable.isFail()) return supportable;

    const parentable = parent.parentable();
    if (parentable.isFail()) return parentable;

    return Status.ok();
  }

}