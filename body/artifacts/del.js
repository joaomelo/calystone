import { extractId, treeify, flatTree } from "@lib";
import { listArtifacts } from "./list";

export async function delArtifact(dependencies, maybeId) {
  const artifacts = listArtifacts(dependencies);

  const id = extractId(maybeId);
  const isRoot = (a) => extractId(a) === id;
  const map = (payload) => ({ method: "del", payload });
  const tree = treeify(artifacts, { isRoot, map });
  const manifests = flatTree(tree);

  const { artifactsMutator } = dependencies;
  return artifactsMutator.do(manifests);
}
