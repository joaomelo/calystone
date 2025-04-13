import { MemoryFileSystemAdapter } from "@/infra/files-system-adapters";
import { delay, fakeDirectory } from "@/utils";

import type { AccessAdapter } from "../access";

export class MemoryAccessAdapter implements AccessAdapter {
  private readonly delayInMilliseconds: number;

  constructor(delayInMilliseconds: number) {
    this.delayInMilliseconds = delayInMilliseconds;
  }

  async request() {
    await delay(this.delayInMilliseconds);

    const dir = fakeDirectory();
    const rootDirectoryName = dir.name;

    return new MemoryFileSystemAdapter({ delayInMilliseconds: this.delayInMilliseconds, rootDirectoryName });
  }
}