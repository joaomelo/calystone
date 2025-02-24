import type { AccessAdapter } from "@/services";

import { fakeDirectory, throwError } from "@/utils";

export class MemoryAccessAdapter implements AccessAdapter<string> {
  rootDirectoryName?: string;

  acquire() {
    if (!this.rootDirectoryName) throwError("MEMORY_ACCESS_WITHOUT_ROOT", "the service does not have a root directory name to acquire");
    return this.rootDirectoryName;
  }

  request() {
    const dir = fakeDirectory();
    this.rootDirectoryName = dir.name;
  }
}