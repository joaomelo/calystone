import { reactive } from "vue";
import { useService, useTask } from "@lib";

export function useEditArtifact(artifactId) {
  const artifactsDataset = useService("artifacts");
  const artifactData = reactive(artifactsDataset.items.get(artifactId));

  console.log({ artifactData });

  const editArtifactTask = useTask(() => artifactsDataset.set(artifactData));

  return { editArtifactTask, artifactData };
}
