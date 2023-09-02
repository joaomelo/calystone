import { computed } from "vue";
import { useService } from "@lib";
import { isOfUser, isOfParent } from "./selectors";

export function useArtifactsTree() {
  const [auth, artifactsDataset] = useService(["auth", "artifacts"]);

  const isOfCurrentUser = (artifact) => isOfUser(artifact, auth.user);

  const rootArtifacts = computed(() => {
    const rootArtifacts = artifactsDataset.filter(isOfCurrentUser);

    rootArtifacts.forEach((rootArtifact) => {
      rootArtifact.children = artifactsDataset.filter((artifact) =>
        isOfParent({ artifact, parentId: rootArtifact.id })
      );
    });

    return rootArtifacts;
  });

  return rootArtifacts;
}
