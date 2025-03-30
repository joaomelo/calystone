import { delay, fakeDirectory, throwError } from "@/utils";

import type { AccessAdapter } from "./access";

export class MemoryAccessAdapter implements AccessAdapter<string> {
  rootDirectoryName?: string;
  private readonly delayInSeconds: number;

  constructor(delayInSeconds: number) {
    this.delayInSeconds = delayInSeconds;
  }

  async acquire() {
    await delay(this.delayInSeconds);
    if (!this.rootDirectoryName) throwError("MEMORY_ACCESS_WITHOUT_ROOT");
    return this.rootDirectoryName;
  }

  async request() {
    await delay(this.delayInSeconds);
    const dir = fakeDirectory();
    this.rootDirectoryName = dir.name;
  }
}