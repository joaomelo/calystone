import { NullThrower } from "@/utils";

import type { DirectoryOpenService } from "./opener";

export class NullDirectoryOpenService extends NullThrower implements DirectoryOpenService{

  open(): Promise<void> {
    this.throw();
  }

  openRoots(): Promise<void> {
    this.throw();
  }

}