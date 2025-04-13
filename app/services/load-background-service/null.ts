import { NullThrower } from "@/utils";

import type { LoadBackgroundService } from "./load";

export class NullLoadBackgroundService extends NullThrower implements LoadBackgroundService{

  start(): never {
    this.throw();
  }

  stop(): never {
    this.throw();
  }

}