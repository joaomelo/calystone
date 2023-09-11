import { useDel, useTask, treeify, flatTree } from "@lib";
import { useArtifacts } from "./use-artifacts";

export function useDelArtifact() {
  const del = useDel("artifacts");
  const artifacts = useArtifacts();

  const delArtifact = useTask((artifactOrId) => {
    const id = artifactOrId?.id || artifactOrId;

    const isRoot = (artifact) => artifact.id === id;
    const tree = treeify(artifacts.list, { isRoot });

    const map = ({ id }) => id;
    const ids = flatTree(tree, { map });

    return del(ids);
  });

  return delArtifact;
}
