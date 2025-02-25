import type { Artifact } from "@/domain";
import type { FileSystemAdapter } from "@/services/adapters";

import { throwError } from "@/utils";

import type { TextService } from "./text";

export class ConnectedTextService implements TextService {
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetch(artifact: Artifact) {

    artifact.status = "loading";
    try {
      const content = artifact.content ?? await this.fileSystemAdapter.fetchFileContent(artifact.id);
      artifact.content = content;
    } catch (error) {
      artifact.status = "unloaded";
      throwError("UNABLE_TO_FETCH_CONTENT", error);
    }

    artifact.status = "loaded";
    return this.decoder.decode(artifact.content);
  }

  async post({ artifact, text }: { artifact: Artifact, text: string }) {
    const content: ArrayBuffer = this.encoder.encode(text).buffer as ArrayBuffer;
    artifact.content = content;
    await this.fileSystemAdapter.postFileContent({ content, id: artifact.id });
  }

}