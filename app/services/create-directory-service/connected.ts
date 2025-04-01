import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { Status, throwNull } from "@/utils";

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

  createbleOn(parent: Node): Status {
    if (!this.supportAdapter.createDirectory()) return Status.fail("CREATE_DIRECTORY_NOT_SUPPORTED");

    const parentable = parent.parentable();
    if (!parentable.isOk()) return parentable;

    return Status.ok();
  }

  createDirectory(): Promise<void> {
    throwNull();
  }

}