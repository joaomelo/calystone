import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { CreateFileService } from "./create-file";

export class NullCreateFileService extends NullThrower implements CreateFileService{

  createbleOn(): Status {
    this.throw();
  }

  createFile(): Promise<void> {
    this.throw();
  }

}