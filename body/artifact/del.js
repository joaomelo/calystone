import { mutate } from "@lib";
import { listDescendants } from "@body";

export async function delArtifact(dependencies, idOrArtifact) {
  const subjectArtifacts = listDescendants(dependencies, idOrArtifact);
  const manifests = subjectArtifacts.map((payload) => ({ method: "del", name: "artifacts", payload }));
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
