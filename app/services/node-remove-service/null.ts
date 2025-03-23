import { NullThrower } from "@/utils";

import type { NodeRemoveService } from "./remove";

export class NullNodeRemoveService extends NullThrower implements NodeRemoveService{

  remove(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}