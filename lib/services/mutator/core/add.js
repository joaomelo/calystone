import { mutate } from "./mutate";

export function add(mutator, manifest) {
  return mutate(mutator, { method: "add", ...manifest });
}
