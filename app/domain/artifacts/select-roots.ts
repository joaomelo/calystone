import type { Artifacts } from "./artifacts";

export function selectRoots(artifacts: Artifacts) {
  return Array.from(artifacts.values()).filter(({ parent }) => !parent);
}
