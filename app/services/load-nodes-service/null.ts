import { NullThrower } from "@/utils";

import type { LoadNodesService } from "./load";

export class NullLoadNodesService extends NullThrower implements LoadNodesService{

  start(): never {
    this.throw();
  }

  stop(): never {
    this.throw();
  }

}