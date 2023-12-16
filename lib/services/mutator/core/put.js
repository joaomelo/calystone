import { mutate } from "./mutate";

export function put(mutator, manifest) {
  return mutate(mutator, { method: "put", ...manifest });
}
