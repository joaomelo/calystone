import { listDescendants } from "@body";
import { mutate } from "@lib";

export async function delArtifact(dependencies, idOrArtifact) {
  const subjectArtifacts = listDescendants(dependencies, idOrArtifact);
  const manifests = subjectArtifacts.map(data => ({
    data,
    method: "del",
    name: "artifacts",
  }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
