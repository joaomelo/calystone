import { mutate } from "@lib";

import { ARTIFACT_STATUSES } from "./artifact-statuses";
import { listAscendants } from "./list-ascendants";

export function activateArtifact(dependencies, idOrArtifact) {
  const artifacts = listAscendants(dependencies, idOrArtifact);
  const manifests = artifacts.map(({ id }) => ({
    data: { id, status: ARTIFACT_STATUSES.ACTIVE },
    method: "put",
    name: "artifacts",
  }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
