import { ancestify, extractId, flatTree, listItems, treeify } from "@lib";

export function listArtifacts(dependencies) {
  const { selector } = dependencies;
  return listItems(selector, "artifacts");
}

export function listDescendants(dependencies, idOrArtifact) {
  const allArtifacts = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const isRoot = a => extractId(a) === id;
  const tree = treeify(allArtifacts, { isRoot });
  return flatTree(tree);
}

export function listAscendants(dependencies, idOrArtifact) {
  const list = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const ascendants = ancestify(list, id);
  return ascendants;
}
