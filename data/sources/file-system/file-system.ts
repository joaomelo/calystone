import { Source } from "../source";
import { loadArtifacts } from "./load-artifacts";

export class FileSystem extends Source {
  private rootHandle: FileSystemDirectoryHandle;

  constructor(rootHandle: FileSystemDirectoryHandle) {
    super();
    this.rootHandle = rootHandle;
  }

  async refresh() {
    const artifacts = await loadArtifacts(this.rootHandle);
    this.replace(artifacts);
  }
};