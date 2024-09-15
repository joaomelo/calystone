import { Source } from "../source";

export class FileSystem extends Source {
  private rootHandle: FileSystemDirectoryHandle;

  constructor(rootHandle: FileSystemDirectoryHandle) {
    super();
    this.rootHandle = rootHandle;
  }

  refresh(): Promise<void> {
    this.artifacts.push(
      { name: "other", parent: null, type: "directory" },
      { name: "another", parent: null, type: "directory" },
    );
    return Promise.resolve();
  }
};