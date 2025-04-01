import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { Directory } from "@/domain";
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

  createbleOn(parent: Node): Status {
    if (!this.supportAdapter.createDirectory()) return Status.fail("CREATE_DIRECTORY_NOT_SUPPORTED");

    const parentable = parent.parentable();
    if (!parentable.isOk()) return parentable;

    return Status.ok();
  }

  async createDirectory(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;

    const createable = this.createbleOn(parent);
    createable.throwOnFail();

    try {
      parent.busy();
      await this.directoryOpen.open(parent);
      const data = await this.fileSystemAdapter.createDirectory(options);
      const directory = new Directory({ nodes: this.nodes, ...data });
      this.nodes.set(directory);
    } finally {
      parent.idle();
    }

  }

}