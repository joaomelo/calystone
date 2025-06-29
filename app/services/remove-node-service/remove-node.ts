import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";

export class RemoveNodeService {
  private readonly connectSource: ConnectSourceService;

  constructor(connectSource: ConnectSourceService) {
    this.connectSource = connectSource;
  }

  async remove(node: Node): Promise<void> {
    const { fileSystemAdapter, nodes } = this.connectSource.stateConnectedOrThrow();
    await fileSystemAdapter.remove(node);
    nodes.remove(node);
  }

  removeable(node: Node) {
    const { fileSystemAdapter } = this.connectSource.stateConnectedOrThrow();
    return fileSystemAdapter.removeable(node);
  }

}