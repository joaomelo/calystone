import { useService, useTask, treeify, flatTree } from "@lib";

export function useDeleteArtifact() {
  const artifactsDataset = useService("artifacts");

  const deleteArtifactTask = useTask((artifactOrArtifactId) => {
    const id = artifactOrArtifactId?.id || artifactOrArtifactId;

    const artifacts = Array.from(artifactsDataset.items.values());

    const isRoot = (artifact) => artifact.id === id;
    const tree = treeify(artifacts, { isRoot });

    const map = ({ id }) => id;
    const ids = flatTree(tree, { map });

    return artifactsDataset.del(ids);
  });
  return deleteArtifactTask;
}
