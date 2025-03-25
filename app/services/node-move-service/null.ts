import { NullThrower } from "@/utils";

import type { NodeMoveService } from "./move";

export class NullNodeMoveService extends NullThrower implements NodeMoveService{

  move(): Promise<void> {
    this.throw();
  }

  support(): boolean {
    this.throw();
  }

}