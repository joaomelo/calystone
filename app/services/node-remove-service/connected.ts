import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import type { NodeRemoveService } from "./remove";

export class ConnectedNodeRemoveService implements NodeRemoveService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
  }

  async remove(node: Node): Promise<void> {
    await this.fileSystemAdapter.removeNode(node);
    this.nodes.remove(node);
  }

  support(node: Node) {
    return this.supportAdapter.remove(node);
  }

}