import type { IgnoreRepository, Pattern } from "@/domain";

import { asPattern } from "@/domain";
import { LocalStorage } from "@/repositories/services";

export class LocalStorageIgnoreRepository implements IgnoreRepository {
  storage: LocalStorage<Pattern>;

  constructor() {
    this.storage = new LocalStorage("ignore", asPattern);
  }

  loadPattern() {
    const pattern = this.storage.load();
    return Promise.resolve(pattern);
  }

  savePattern(pattern: Pattern) {
    this.storage.save(pattern);
    return Promise.resolve();
  }
}