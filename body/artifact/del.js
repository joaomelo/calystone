import { alignTagsForManifests, listDescendants } from "@body";
import { mutate } from "@lib";

export async function delArtifact(dependencies, artifactId) {
  const manifests = [];

  const artifactsToDel = listDescendants(dependencies, artifactId);
  artifactsToDel.forEach(({ id }) => {
    // must remove artifact from any tags its is associated with
    const payload = { artifactId: id, tagsIds: [] };
    const tagsManifests = alignTagsForManifests(dependencies, payload);
    manifests.push(...tagsManifests);

    manifests.push({ data: id, method: "del", name: "artifacts" });
  });

  console.log({ artifactsToDel, manifests });

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
