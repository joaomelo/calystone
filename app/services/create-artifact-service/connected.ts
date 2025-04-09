import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";

import type { DirectoryOpenService } from "../directory-open-service/open";
import type { ExchangeArtifactService } from "../exchange-artifact-service";
import type { CreateArtifactService } from "./create-artifact";

export class ConnectedCreateArtifactService implements CreateArtifactService {
  private readonly directoryOpen: DirectoryOpenService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(options: { directoryOpen: DirectoryOpenService; exchangeArtifact: ExchangeArtifactService; fileSystemAdapter: FileSystemAdapter, nodes: Nodes }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
    this.directoryOpen = options.directoryOpen;
    this.exchangeArtifact = options.exchangeArtifact;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;
    try {
      parent.busy();
      await this.directoryOpen.open(parent);
      const data = await this.fileSystemAdapter.createArtifact(options);
      const artifact = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(artifact);
      await this.exchangeArtifact.fetchInto(artifact);
    } finally {
      parent.idle();
    }
  }

}