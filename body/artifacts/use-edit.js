import { reactive } from "vue";
import { useEdit, useTask } from "@lib";
import { useArtifacts } from "./use-artifacts";

export function useEditArtifact(artifactId) {
  const edit = useEdit("artifacts");
  const artifacts = useArtifacts();

  const artifact = reactive(artifacts.hash[artifactId]);
  const editArtifact = useTask(() => edit(artifact));

  return { editArtifact, artifact };
}
