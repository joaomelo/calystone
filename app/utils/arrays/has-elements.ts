import type { MaybeArray } from "./maybe-array";

import { asArray } from "./as-array";

export function hasElements<T>(maybeArray: MaybeArray<T>): boolean {
  return asArray(maybeArray).length > 0;
}
