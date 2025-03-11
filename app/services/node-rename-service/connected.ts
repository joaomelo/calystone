import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { Directory } from "@/domain";

import type { NodeRenameService } from "./renamer";

export class ConnectedNodeRenameService implements NodeRenameService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
  }

  async rename(options: { name: string, node: Node }): Promise<void> {
    const adapterOptions = { id: options.node.id, name: options.name };
    if (options.node instanceof Directory) {
      await this.fileSystemAdapter.renameDirectory(adapterOptions);
    } else {
      await this.fileSystemAdapter.renameFile(adapterOptions);
    }

    const node = this.nodes.getOrThrow(options.node.id);
    node.name = options.name;
  }

  support(node: Node) {
    return (node instanceof Directory)
      ? this.supportAdapter.renameDirectory()
      : this.supportAdapter.renameFile();
  }

}