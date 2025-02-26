import { NullThrower } from "@/utils";

import type { RenamerService } from "./renamer";

export class NullRenamerService extends NullThrower implements RenamerService{

  perform(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}