import { NullThrower } from "@/utils";

import type { AccessAdapter } from "./access";

export class NullAccessAdapter<T> extends NullThrower implements AccessAdapter<T> {

  acquire(): T {
    this.throw();
  }

  request() {
    this.throw();
  }
}