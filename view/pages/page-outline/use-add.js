import { useTask } from "@lib";
import { addArtifact } from "@body";

export function useAddArtifact(parentId) {
  return useTask(
    async (dependencies, payload) => {
      await addArtifact(dependencies, payload);
    },
    { name: null, parentId }
  );
}
