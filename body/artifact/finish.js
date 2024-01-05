import { mutate } from "@lib";
import { listDescendants } from "@body";
import { ARTIFACT_STATUSES, isActive } from "./statuses";

export function completeArtifact(dependencies, idOrArtifact) {
  return finishArtifact(dependencies, { idOrArtifact, status: ARTIFACT_STATUSES.COMPLETE });
}

export function cancelArtifact(dependencies, idOrArtifact) {
  return finishArtifact(dependencies, { idOrArtifact, status: ARTIFACT_STATUSES.CANCELLED });
}

function finishArtifact(dependencies, { idOrArtifact, status }) {
  const potentialArtifacts = listDescendants(dependencies, idOrArtifact);
  const subjectedArtifacts = potentialArtifacts.filter(a => isActive(a));
  const manifests = subjectedArtifacts.map(({ id }) => ({
    method: "put",
    name: "artifacts",
    payload: { id, status },
  }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
