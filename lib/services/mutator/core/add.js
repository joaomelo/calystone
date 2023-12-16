import { mutate } from "./mutate";

export function add(dependencies, manifest) {
  return mutate(dependencies, { method: "add", ...manifest });
}
