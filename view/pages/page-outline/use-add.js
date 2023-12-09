import { useUseCase } from "@lib";
import { addArtifact } from "@body";

export function useAddArtifact(parentId) {
  return useUseCase(
    async (dependencies, payload) => {
      await addArtifact(dependencies, payload);
    },
    { name: null, parentId }
  );
}
