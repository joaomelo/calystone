import { throwError } from "@/utils";

import type { AccessService } from "./service";

export class NullAccess<T> implements AccessService<T> {

  acquire(): T {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an acquire operation");
  }

  request() {
    throwError("NO_SUPPORT", "the access tech needs to be supported for the access to peform an request operation");
  }
}