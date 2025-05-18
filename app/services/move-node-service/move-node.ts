import type { Directory, Node } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwError } from "@/utils";

export class MoveNodeService {
  private fileSystemAdapter?: FileSystemAdapter;

  async move(options: { subject: Node, target: Directory }) {
    const fileSystemAdapter = this.inject();
    const { subject, target } = options;
    const moveable = fileSystemAdapter.moveable(subject);
    moveable.throwOnFail();
    try {
      subject.busy();
      target.busy();

      await fileSystemAdapter.move(options);
      options.subject.move(options.target);
    } finally {
      subject.idle();
      target.idle();
    }
  }

  moveable(node: Node) {
    const fileSystemAdapter = this.inject();
    return fileSystemAdapter.moveable(node);
  }

  provide(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    return this.fileSystemAdapter;
  }
}