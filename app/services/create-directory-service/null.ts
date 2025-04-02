import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { CreateDirectoryService } from "./create-directory";

export class NullCreateDirectoryService extends NullThrower implements CreateDirectoryService{

  create(): Promise<void> {
    this.throw();
  }

  createbleOn(): Status {
    this.throw();
  }

}