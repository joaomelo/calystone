import { NullThrower } from "@/utils";

import type { DirectoryOpenService } from "./open";

export class NullDirectoryOpenService extends NullThrower implements DirectoryOpenService{

  open(): never {
    this.throw();
  }

  openRoots(): never {
    this.throw();
  }

}