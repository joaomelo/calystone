import { mutate } from "./mutate";

export function del(mutator, manifest) {
  return mutate(mutator, { method: "del", ...manifest });
}
