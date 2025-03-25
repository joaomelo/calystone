import type { Directory, Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import type { NodeMoveService } from "./move";

export class ConnectedNodeMoveService implements NodeMoveService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
  }

  async move(options: { subject: Node, target: Directory }): Promise<void> {
    await this.fileSystemAdapter.moveNode(options);
    this.nodes.move(options);
  }

  support(node: Node) {
    return this.supportAdapter.move(node);
  }

}