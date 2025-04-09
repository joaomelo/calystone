import type { Directory, Node } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import type { NodeMoveService } from "./move";

export class ConnectedNodeMoveService implements NodeMoveService {
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async move(options: { subject: Node, target: Directory }) {
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
    return this.fileSystemAdapter.moveable(node);
  }

}