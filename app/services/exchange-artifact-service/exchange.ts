import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwError } from "@/utils";

export class ExchangeArtifactService {
  private fileSystemAdapter?: FileSystemAdapter;

  async fetchInto(artifact: Artifact) {
    if (artifact.isLoaded()) return;

    const fileSystemAdapter = this.inject();

    artifact.busy();
    try {
      const content = await fileSystemAdapter.fetchContent(artifact);
      artifact.fromBinary(content);
      artifact.load();
    } catch (error) {
      artifact.unload();
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    } finally {
      artifact.idle();
    }
  }

  async postFrom(artifact: Artifact) {
    const fileSystemAdapter = this.inject();
    await fileSystemAdapter.postContent(artifact);
  }

  provide(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    return this.fileSystemAdapter;
  }
}