import { mutate } from "@lib";
import { flatTreeIncluding } from "@body";

export async function delArtifact(dependencies, idOrArtifact) {
  const subjectArtifacts = flatTreeIncluding(dependencies, idOrArtifact);
  const manifests = subjectArtifacts.map((payload) => ({ method: "del", name: "artifacts", payload }));

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
