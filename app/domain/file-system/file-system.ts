import { type Source } from "@/domain/source";

import { fileSystemSourceLoad } from "./load";

export class FileSystemSource implements Source { 
  private readonly rootHandle: FileSystemDirectoryHandle;

  constructor(rootHandle: FileSystemDirectoryHandle) {
    this.rootHandle = rootHandle;
  }

  load() {
    return fileSystemSourceLoad(this.rootHandle);
  }
}
