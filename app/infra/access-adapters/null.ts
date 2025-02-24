import { throwError } from "@/utils";

import type { AccessAdapter } from "./access";

export class NullAccessAdapter<T> implements AccessAdapter<T> {

  acquire(): T {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an acquire operation");
  }

  request() {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an request operation");
  }
}