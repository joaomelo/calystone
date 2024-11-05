import type { Artifacts } from "@/domain";

import { useStore } from "@/domain";

type WithArtifacts<T> = (artifacts: Artifacts) => T;

export function useWithArtifacts<T>(withArtifacts: WithArtifacts<T>) {
  const { artifacts } = useStore();
  return withArtifacts(artifacts);
}