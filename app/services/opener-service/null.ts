import { throwCritical } from "@/utils";

import type { OpenerService } from "./opener";

export class NullOpenerService implements OpenerService{

  openDirectory(): Promise<void> {
    this.throw();
  }

  openRoots(): Promise<void> {
    this.throw();
  }

  throw(): never {
    throwCritical("NULL_IMPLEMENTATION", "null service does not have an implementation");
  }

}