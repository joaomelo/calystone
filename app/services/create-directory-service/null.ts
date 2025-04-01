import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { CreateDirectoryService } from "./create-directory";

export class NullCreateDirectoryService extends NullThrower implements CreateDirectoryService{

  createbleOn(): Status {
    this.throw();
  }

  createDirectory(): Promise<void> {
    this.throw();
  }

}