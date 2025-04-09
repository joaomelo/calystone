import { MemoryFileSystemAdapter } from "@/infra/files-system-adapters";
import { delay, fakeDirectory, throwError } from "@/utils";

import type { AccessAdapter } from "../access";

export class MemoryAccessAdapter implements AccessAdapter {
  rootDirectoryName?: string;
  private readonly delayInSeconds: number;

  constructor(delayInSeconds: number) {
    this.delayInSeconds = delayInSeconds;
  }

  async acquire() {
    await delay(this.delayInSeconds);
    if (!this.rootDirectoryName) throwError("MEMORY_ACCESS_WITHOUT_ROOT");
    return new MemoryFileSystemAdapter({ delayInSeconds: this.delayInSeconds, rootDirectoryName: this.rootDirectoryName });
  }

  async request() {
    await delay(this.delayInSeconds);
    const dir = fakeDirectory();
    this.rootDirectoryName = dir.name;
  }
}