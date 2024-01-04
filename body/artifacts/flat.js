import { extractId, treeify, flatTree } from "@lib";
import { listArtifacts } from "@body";

export function flatTreeIncluding(dependencies, idOrArtifact) {
  const allArtifacts = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const isRoot = (a) => extractId(a) === id;
  const tree = treeify(allArtifacts, { isRoot });
  return flatTree(tree);
}
