import { NullThrower } from "@/utils";

import type { DirectoryOpenerService } from "./opener";

export class NullDirectoryOpenerService extends NullThrower implements DirectoryOpenerService{

  open(): Promise<void> {
    this.throw();
  }

  openRoots(): Promise<void> {
    this.throw();
  }

}