// import type { Node } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { Status, throwError } from "@/utils";

import type { ShareNodeService } from "./share";

export class ConnectedShareNodeService implements ShareNodeService {
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  share(): Promise<void> {
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
    throwError("TODO");
  }

  shareable(node: Node): Status {
    return Status.fail("TODO");
  }
}