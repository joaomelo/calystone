import type { ArtifactPayload } from "./artifact";

import { useAdd } from "@service";
import { useTask } from "@shared";
import { artifactFieldsSchema } from "./artifact";

export function useArtifactAdd() {
  const add = useAdd("artifacts");
  const addArtifact = async (payload: ArtifactPayload) => {
    const artifactFields = artifactFieldsSchema.parse(payload);
    await add(artifactFields);
  };
  const addArtifactTask = useTask(addArtifact);
  return addArtifactTask;
}
