import { extractId, treeify, flatTree, mutate } from "@lib";
import { listArtifacts } from "@body";

export async function delArtifact(dependencies, maybeId) {
  const artifacts = listArtifacts(dependencies);

  const id = extractId(maybeId);
  const isRoot = (a) => extractId(a) === id;
  const map = (payload) => ({ method: "del", name: "artifacts", payload });
  const tree = treeify(artifacts, { isRoot, map });
  const manifests = flatTree(tree);

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
