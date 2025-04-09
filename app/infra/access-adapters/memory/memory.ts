import { MemoryFileSystemAdapter } from "@/infra/files-system-adapters";
import { delay, fakeDirectory } from "@/utils";

import type { AccessAdapter } from "../access";

export class MemoryAccessAdapter implements AccessAdapter {
  private readonly delayInSeconds: number;

  constructor(delayInSeconds: number) {
    this.delayInSeconds = delayInSeconds;
  }

  async request() {
    await delay(this.delayInSeconds);

    const dir = fakeDirectory();
    const rootDirectoryName = dir.name;

    return new MemoryFileSystemAdapter({ delayInSeconds: this.delayInSeconds, rootDirectoryName });
  }
}