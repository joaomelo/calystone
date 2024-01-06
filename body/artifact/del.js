import { mutate } from "@lib";
import { listDescendants } from "@body";

export async function delArtifact(dependencies, idOrArtifact) {
  const subjectArtifacts = listDescendants(dependencies, idOrArtifact);
  const manifests = subjectArtifacts.map(data => ({
    method: "del",
    name: "artifacts",
    data,
  }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
