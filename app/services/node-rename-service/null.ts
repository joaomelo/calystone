import { NullThrower } from "@/utils";

import type { NodeRenameService } from "./renamer";

export class NullNodeRenameService extends NullThrower implements NodeRenameService{

  rename(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}