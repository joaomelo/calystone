import { useDependencies, useTask } from "@lib";
import { editArtifact, getArtifact } from "@body";
import { goBack } from "@view";

export function useEdit(artifactId) {
  const dependencies = useDependencies();

  const back = () => goBack(dependencies);

  const reset = () => {
    const { id, name, notes } = getArtifact(dependencies, artifactId);
    return { id, name, notes };
  };

  const { task, payload } = useTask(async (dependencies, payload) => {
    await editArtifact(dependencies, payload);
    back();
  }, reset);

  return { save: task, back, payload };
}
