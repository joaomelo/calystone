import { NullThrower } from "@/utils";

import type { NodeMoveService } from "./move";

export class NullNodeMoveService extends NullThrower implements NodeMoveService{

  move(): never {
    this.throw();
  }

  moveable(): never {
    this.throw();
  }

}