import type { Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { throwNull } from "@/utils";

import type { CreateDirectoryService } from "./create-directory";

export class ConnectedCreateDirectoryService implements CreateDirectoryService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
  }

  createDirectory(): Promise<void> {
    throwNull();
  }

  support() {
    return this.supportAdapter.createDirectory();
  }

}