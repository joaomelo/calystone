import { BaseAccessService } from "../base";

export class MemoryAccessService extends BaseAccessService<undefined> {
  enableMemory: boolean;

  constructor(enableMemory: boolean) {
    super();
    this.enableMemory = enableMemory;
  }

  active() {
    return this.enableMemory;
  }

  performAccess() {
    return Promise.resolve(undefined);
  }
}