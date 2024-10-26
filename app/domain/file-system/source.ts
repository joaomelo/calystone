import { type Artifact } from "@/domain/artifact";
import { type Source } from "@/domain/source";

import { fileSystemSourceLoad } from "./load";

export class FileSystemSource implements Source { 
  private readonly rootHandle: FileSystemDirectoryHandle;

  constructor(rootHandle: FileSystemDirectoryHandle) {
    this.rootHandle = rootHandle;
  }

  load(): AsyncGenerator<Artifact> {
    return fileSystemSourceLoad(this.rootHandle);
  }
}