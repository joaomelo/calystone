import type { AccessAdapter } from "../access";

export class FsaAccessAdapter implements AccessAdapter<{ rootHandle: FileSystemDirectoryHandle }> {

  async request() {
    const rootHandle = await showDirectoryPicker();
    return { rootHandle };
  }
}
