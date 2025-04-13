import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";

import type { ExchangeArtifactService } from "../exchange-artifact-service";
import type { OpenDirectoryService } from "../open-directory-service/open";
import type { CreateArtifactService } from "./create-artifact";

export class ConnectedCreateArtifactService implements CreateArtifactService {
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: { exchangeArtifact: ExchangeArtifactService; fileSystemAdapter: FileSystemAdapter, nodes: Nodes; openDirectory: OpenDirectoryService; }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
    this.openDirectory = options.openDirectory;
    this.exchangeArtifact = options.exchangeArtifact;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const { parent } = options;
    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const data = await this.fileSystemAdapter.createArtifact(options);
      const artifact = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(artifact);
      await this.exchangeArtifact.fetchInto(artifact);
    } finally {
      parent.idle();
    }
  }

}