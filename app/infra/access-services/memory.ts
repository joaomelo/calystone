import { fakeDirectory, throwError } from "@/utils";

import type { AccessService } from "./service";

export class MemoryAccessService implements AccessService<string> {
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