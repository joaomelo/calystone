import { NullThrower } from "@/utils";

import type { OpenerService } from "./opener";

export class NullOpenerService extends NullThrower implements OpenerService{

  openDirectory(): Promise<void> {
    this.throw();
  }

  openRootDirectories(): Promise<void> {
    this.throw();
  }

}