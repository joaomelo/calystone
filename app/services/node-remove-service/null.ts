import { NullThrower } from "@/utils";

import type { NodeRemoveService } from "./remove";

export class NullNodeRemoveService extends NullThrower implements NodeRemoveService{

  remove(): never {
    this.throw();
  }

  removeable(): never {
    this.throw();
  }

}