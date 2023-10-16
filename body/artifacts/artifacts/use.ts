import { inject } from "vue";

import { artifactsKey } from "./artifacts";

export function useArtifacts() {
  const artifacts = inject(artifactsKey);
  if (!artifacts)
    throw new Error("artifacts singleton was not provided as plugin");
  return artifacts;
}
