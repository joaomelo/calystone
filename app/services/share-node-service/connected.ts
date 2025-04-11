import type { Node } from "@/domain";
import type { ShareAdapter } from "@/infra";

import type { ShareNodeService } from "./share";

export class ConnectedShareNodeService implements ShareNodeService {
  private readonly shareAdapter: ShareAdapter;

  constructor(shareAdapter: ShareAdapter) {
    this.shareAdapter = shareAdapter;
  }

  async share(node: Node): Promise<void> {
    const shareable = this.shareable(node);
    shareable.throwOnFail();

    node.busy();
    try {
      await this.shareAdapter.share(node);
    } finally {
      node.idle();
    }
  }

  shareable(node: Node) {
    return this.shareAdapter.shareable(node);
  }
}