import type { Node } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import type { NodeMoveService } from "./move";

export class ConnectedNodeMoveService implements NodeMoveService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
  }

  async move(options: { subject: Node, target: Node }) {
    const { subject, target } = options;
    const moveable = subject.moveable(target);
    moveable.throwOnFail();
    try {
      subject.busy();
      target.busy();

      await this.fileSystemAdapter.move(options);
      options.subject.move(options.target);
    } finally {
      subject.idle();
      target.idle();
    }
  }

  moveable(node: Node) {
    return this.supportAdapter.move(node);
  }

}