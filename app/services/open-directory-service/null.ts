import { NullThrower } from "@/utils";

import type { OpenDirectoryService } from "./open";

export class NullOpenDirectoryService extends NullThrower implements OpenDirectoryService{

  open(): never {
    this.throw();
  }

  openRoots(): never {
    this.throw();
  }

}