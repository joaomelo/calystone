import { reactive } from "vue";
import { useTask, useAdd, useAuthState } from "@lib";

export function useAddArtifact() {
  const add = useAdd("artifacts");
  const authState = useAuthState();

  const artifact = reactive({});
  const reset = () => {
    artifact.name = null;
    artifact.parentId = null;
    artifact.usersIds = null;
  };
  reset();

  const addArtifact = useTask(async () => {
    const { parentId } = artifact;
    artifact.usersIds = parentId ? null : [authState.id];
    const result = await add(artifact);
    reset();
    return result;
  });

  return { addArtifact, artifact };
}
