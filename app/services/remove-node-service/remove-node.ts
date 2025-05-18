import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwError } from "@/utils";

export class RemoveNodeService {
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  provide(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async remove(node: Node): Promise<void> {
    const fileSystemAdapter = this.inject();
    await fileSystemAdapter.remove(node);
    this.nodes.remove(node);
  }

  removeable(node: Node) {
    const fileSystemAdapter = this.inject();
    return fileSystemAdapter.removeable(node);
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    return this.fileSystemAdapter;
  }

}