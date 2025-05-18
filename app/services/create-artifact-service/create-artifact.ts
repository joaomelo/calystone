import type { Directory, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode } from "@/domain";
import { throwError } from "@/utils";

import type { ExchangeArtifactService } from "../exchange-artifact-service";
import type { OpenDirectoryService } from "../open-directory-service";

export class CreateArtifactService {
  private readonly exchangeArtifact: ExchangeArtifactService;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly openDirectory: OpenDirectoryService;

  constructor(options: { exchangeArtifact: ExchangeArtifactService, nodes: Nodes, openDirectory: OpenDirectoryService }) {
    const { exchangeArtifact, nodes, openDirectory } = options;
    this.exchangeArtifact = exchangeArtifact;
    this.nodes = nodes;
    this.openDirectory = openDirectory;
  }

  async create(options: { name: string, parent: Directory }): Promise<void> {
    const fileSystemAdapter = this.inject();
    const { parent } = options;
    try {
      parent.busy();
      await this.openDirectory.open(parent);
      const data = await fileSystemAdapter.createArtifact(options);
      const artifact = createNode({ nodes: this.nodes, ...data });
      this.nodes.set(artifact);
      await this.exchangeArtifact.fetchInto(artifact);
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