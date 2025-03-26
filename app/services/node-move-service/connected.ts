import type { Directory, Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { throwError } from "@/utils";

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
    const { subject, target } = options;
    const moveable = subject.moveable(target);
    if (!moveable.able) throwError(moveable.cause);
    await this.fileSystemAdapter.moveNode(options);
    options.subject.move(options.target);
  }

  support(node: Node) {
    return this.supportAdapter.move(node);
  }

}