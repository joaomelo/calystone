import type { Node } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { throwNull } from "@/utils";

import type { ShareNodeService } from "./share";

export class ConnectedShareNodeService implements ShareNodeService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
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
    return this.supportAdapter.share(node);
  }
}