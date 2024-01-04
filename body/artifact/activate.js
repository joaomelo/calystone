import { mutate } from "@lib";
import { flatTreeIncluding } from "@body";
import { ARTIFACT_STATUSES } from "./statuses";

export function activateArtifact(dependencies, idOrArtifact) {
  const subjectArtifacts = flatTreeIncluding(dependencies, idOrArtifact);
  const manifests = subjectArtifacts.map((a) => ({
    method: "put",
    name: "artifacts",
    payload: { id: a.id, status: ARTIFACT_STATUSES.ACTIVE },
  }));

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
