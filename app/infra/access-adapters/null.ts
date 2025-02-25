import type { AccessAdapter } from "@/services";

import { NullThrower } from "@/utils";

export class NullAccessAdapter<T> extends NullThrower implements AccessAdapter<T> {

  acquire(): T {
    this.throw();
  }

  request() {
    this.throw();
  }
}