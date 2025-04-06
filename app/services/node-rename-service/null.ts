import { NullThrower } from "@/utils";

import type { NodeRenameService } from "./rename";

export class NullNodeRenameService extends NullThrower implements NodeRenameService{

  rename(): never {
    this.throw();
  }

  renameable(): never {
    this.throw();
  }

}