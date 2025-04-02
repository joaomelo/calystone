import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { CreateFileService } from "./create-file";

export class NullCreateFileService extends NullThrower implements CreateFileService{

  create(): Promise<void> {
    this.throw();
  }

  createbleOn(): Status {
    this.throw();
  }

}