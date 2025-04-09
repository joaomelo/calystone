import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import type { NodeRemoveService } from "./remove";

export class ConnectedNodeRemoveService implements NodeRemoveService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
  }

  async remove(node: Node): Promise<void> {
    await this.fileSystemAdapter.remove(node);
    this.nodes.remove(node);
  }

  removeable(node: Node) {
    return this.fileSystemAdapter.removeable(node);
  }

}