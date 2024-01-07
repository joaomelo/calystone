import { editArtifact, getArtifact } from "@body";
import { useDependencies, useTask } from "@lib";
import { goBack } from "@view";

export function useEdit(artifactId) {
  const dependencies = useDependencies();

  const back = () => goBack(dependencies);
  const reset = () => getArtifact(dependencies, artifactId);
  const { task, payload } = useTask(async (dependencies, payload) => {
    await editArtifact(dependencies, payload);
    back();
  }, reset);

  return { save: task, back, payload };
}
