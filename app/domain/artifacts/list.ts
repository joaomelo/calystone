import type { Artifacts } from "./artifacts";

export function list(artifacts: Artifacts) {
  return Array.from(artifacts.values());
}