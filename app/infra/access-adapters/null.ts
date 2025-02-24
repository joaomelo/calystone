import type { AccessAdapter } from "@/services";

import { throwError } from "@/utils";

export class NullAccessAdapter<T> implements AccessAdapter<T> {

  acquire(): T {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an acquire operation");
  }

  request() {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an request operation");
  }
}