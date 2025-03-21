import { throwCritical } from "./throw";

export class NullThrower {

  throw(): never {
    throwCritical("NULL_IMPLEMENTATION", "this null class does not have an implementation");
  }

}