import { useDependencies, useTask } from "@lib";
import { editArtifact, getArtifact } from "@body";
import { goBack } from "@view";

export function useEdit(artifactId) {
  const dependencies = useDependencies();

  const back = () => goBack(dependencies);

  const { id, name, notes } = getArtifact(dependencies, artifactId);
  const { task, payload } = useTask(
    async (dependencies, payload) => {
      await editArtifact(dependencies, payload);
      back();
    },
    { id, name, notes }
  );

  return { save: task, back, payload };
}
