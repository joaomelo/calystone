import { delay } from "@/utils";
import { faker } from "@faker-js/faker";

import type { AccessAdapter } from "../access";

export class MemoryAccessAdapter implements AccessAdapter<{ rootDirectoryName: string }> {
  private readonly delayInMilliseconds: number;

  constructor(delayInMilliseconds: number) {
    this.delayInMilliseconds = delayInMilliseconds;
  }

  async request() {
    await delay(this.delayInMilliseconds);

    const names = faker.system.directoryPath().split("/").filter(Boolean);
    const rootDirectoryName = faker.helpers.arrayElement(names);

    return { rootDirectoryName };
  }
}