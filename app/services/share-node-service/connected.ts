import type { Node } from "@/domain";
import type { ShareAdapter } from "@/infra";

import { throwNull } from "@/utils";

import type { ShareNodeService } from "./share";

export class ConnectedShareNodeService implements ShareNodeService {
  private readonly shareAdapter: ShareAdapter;

  constructor(shareAdapter: ShareAdapter) {
    this.shareAdapter = shareAdapter;
  }

  share(): never {
    // node.busy();
    // try {
    //   const content = await this.fileSystemAdapter.fetchFileContent(node.id);
    //   node.fromBinary(content);
    //   node.load();
    // } catch (error) {
    //   node.unload();
    //   throwError("UNABLE_TO_FETCH_CONTENT", error);
    // } finally {
    //   node.idle();
    // }
    throwNull();
  }

  shareable(node: Node) {
    return this.shareAdapter.shareable(node);
  }
}