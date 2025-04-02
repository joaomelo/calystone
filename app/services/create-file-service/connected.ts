import type { Directory, Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { Artifact } from "@/domain";
import { Status } from "@/utils";

import type { DirectoryOpenService } from "../directory-open-service/open";
import type { CreateFileService } from "./create-file";

export class ConnectedCreateFileService implements CreateFileService {
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
      const data = await this.fileSystemAdapter.createFile(options);
      const artifact = new Artifact({ nodes: this.nodes, ...data });
      this.nodes.set(artifact);
    } finally {
      parent.idle();
    }

  }

  createbleOn(parent: Node): Status {
    if (!this.supportAdapter.createFile()) return Status.fail("CREATE_FILE_NOT_SUPPORTED");

    const parentable = parent.parentable();
    if (!parentable.isOk()) return parentable;

    return Status.ok();
  }

}