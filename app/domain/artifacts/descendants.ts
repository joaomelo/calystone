import type { Artifact } from "@/domain/artifact";
import type { Id } from "@/utils";

type ArtifactOrId = Artifact | Id;

export function listDescendants(artifactOrId: ArtifactOrId, idOrArtifact) {
  const allArtifacts = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const isRoot = a => extractId(a) === id;
  const tree = treeify(allArtifacts, { isRoot });
  return flatTree(tree);
}
