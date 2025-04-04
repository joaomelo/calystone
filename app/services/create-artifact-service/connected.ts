import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { createNode, type Directory, type Node, type Nodes } from "@/domain";
import { Status } from "@/utils";

import type { DirectoryOpenService } from "../directory-open-service/open";
import type { ExchangeArtifactService } from "../exchange-artifact-service";
import type { CreateArtifactService } from "./create-artifact";

export class ConnectedCreateArtifactService implements CreateArtifactService {
  private readonly directoryOpen: DirectoryOpenService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { directoryOpen: DirectoryOpenService; exchangeArtifact: ExchangeArtifactService; fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter, }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
    this.directoryOpen = options.directoryOpen;
    this.exchangeArtifact = options.exchangeArtifact;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;

    const createable = this.createbleOn(parent);
    createable.throwOnFail();

    try {
      parent.busy();
      await this.directoryOpen.open(parent);
      const data = await this.fileSystemAdapter.createArtifact(options);
      const artifact = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(artifact);
      await this.exchangeArtifact.fetch(artifact);
    } finally {
      parent.idle();
    }

  }

  createbleOn(parent: Node): Status {
    if (!this.supportAdapter.createArtifact()) return Status.fail("CREATE_FILE_NOT_SUPPORTED");

    const parentable = parent.parentable();
    if (!parentable.isOk()) return parentable;

    return Status.ok();
  }

}