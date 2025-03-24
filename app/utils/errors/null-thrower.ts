import { throwCritical } from "./throw";

export class NullThrower {
  throw(): never {
    throwNull();
  }
}

export function throwNull(): never {
  throwCritical("NULL_IMPLEMENTATION", "this is a null implementation");
}