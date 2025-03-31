import { NullThrower } from "@/utils";

import type { CreateDirectoryService } from "./create-directory";

export class NullCreateDirectoryService extends NullThrower implements CreateDirectoryService{

  createDirectory(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}