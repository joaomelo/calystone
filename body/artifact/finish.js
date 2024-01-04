import { mutate } from "@lib";
import { flatTreeIncluding } from "@body";
import { isActive, ARTIFACT_STATUSES } from "./statuses";

export function completeArtifact(dependencies, idOrArtifact) {
  return finishArtifact(dependencies, { idOrArtifact, status: ARTIFACT_STATUSES.COMPLETE });
}

export function cancelArtifact(dependencies, idOrArtifact) {
  return finishArtifact(dependencies, { idOrArtifact, status: ARTIFACT_STATUSES.CANCELLED });
}

function finishArtifact(dependencies, { idOrArtifact, status }) {
  const potentialArtifacts = flatTreeIncluding(dependencies, idOrArtifact);
  const subjectedArtifacts = potentialArtifacts.filter((a) => isActive(a));
  const manifests = subjectedArtifacts.map((a) => ({
    method: "put",
    name: "artifacts",
    payload: { id: a.id, status },
  }));

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
