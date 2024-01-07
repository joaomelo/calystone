import { listAscendants } from "@body";
import { mutate } from "@lib";

import { ARTIFACT_STATUSES } from "./statuses";

export function activateArtifact(dependencies, idOrArtifact) {
  const artifacts = listAscendants(dependencies, idOrArtifact);
  const manifests = artifacts.map(({ id }) => ({
    method: "put",
    name: "artifacts",
    data: { id, status: ARTIFACT_STATUSES.ACTIVE },
  }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
