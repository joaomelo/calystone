import { useDependencies, useTask } from "@lib";
import { editArtifact, getArtifact } from "@body";

export function useEdit(artifactId, success) {
  const dependencies = useDependencies();

  const { id, name, notes } = getArtifact(dependencies, artifactId);
  const { task, payload } = useTask(
    async (dependencies, payload) => {
      await editArtifact(dependencies, payload);
      success();
    },
    { id, name, notes }
  );

  return { save: task, payload };
}
