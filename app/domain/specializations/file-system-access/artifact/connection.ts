import { ArtifactConnection } from "@/domain/nodes";

import { fetchContent } from "./fetch";
import { postContent } from "./post";

export class FsaArtifactConnection extends ArtifactConnection {
  handle: FileSystemFileHandle;

  constructor(handle: FileSystemFileHandle) {
    super();
    this.handle = handle;
  }

  fetch(): Promise<ArrayBuffer> {
    return fetchContent(this.handle);
  }

  post(content: ArrayBuffer): Promise<void> {
    return postContent(content, this.handle);
  }
}
