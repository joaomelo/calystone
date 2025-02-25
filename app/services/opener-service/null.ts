import { NullThrower } from "@/utils";

import type { OpenerService } from "./opener";

export class NullOpenerService extends NullThrower implements OpenerService{

  openDirectory(): Promise<void> {
    this.throw();
  }

  openRoots(): Promise<void> {
    this.throw();
  }

}