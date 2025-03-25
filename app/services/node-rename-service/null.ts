import { NullThrower } from "@/utils";

import type { NodeRenameService } from "./rename";

export class NullNodeRenameService extends NullThrower implements NodeRenameService{

  rename(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}