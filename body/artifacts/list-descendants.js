import { extractId, flatTree, treeify } from "@lib";

import { listArtifacts } from "./list-artifacts";

export function listDescendants(dependencies, idOrArtifact) {
  const allArtifacts = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const isRoot = a => extractId(a) === id;
  const tree = treeify(allArtifacts, { isRoot });
  return flatTree(tree);
}
