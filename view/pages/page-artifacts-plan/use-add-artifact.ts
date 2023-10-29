import type { ArtifactPayload } from "@body";

import { useArtifacts } from "@body";
import { useTask } from "@view/components";

export function useAddArtifact() {
  const artifacts = useArtifacts();
  const add = useTask((payload: ArtifactPayload) => artifacts.add(payload));
  return add;
}
