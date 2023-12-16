import { mutate } from "./mutate";

export function del(dependencies, manifest) {
  return mutate(dependencies, { method: "del", ...manifest });
}
