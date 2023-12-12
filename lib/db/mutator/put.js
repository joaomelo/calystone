import { mutate } from "./mutate";

export function put(dependencies, manifest) {
  return mutate(dependencies, { method: "put", ...manifest });
}
