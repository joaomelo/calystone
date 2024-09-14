import { type Source } from "../source";

export class FileSystem implements Source{
  private root: FileSystemDirectoryHandle;

  constructor(root: FileSystemDirectoryHandle) {
    this.root = root;
  }

  listRoots(): string[] {
    return [];
  }
};