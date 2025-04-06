import { NullThrower } from "@/utils";

import type { CreateDirectoryService } from "./create-directory";

export class NullCreateDirectoryService extends NullThrower implements CreateDirectoryService{

  create(): never {
    this.throw();
  }

  createbleOn(): never {
    this.throw();
  }

}