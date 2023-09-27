import { useTask, treeify, flatTree } from "@shared";
import { useService } from "@service";
import { useArtifacts } from "./use-artifacts";

export function useArtifactDel() {
  const service = useService();

  const { task } = useTask(async (artifactOrId) => {
    const id = artifactOrId?.id || artifactOrId;

    const artifacts = useArtifacts();
    const isRoot = (artifact) => artifact.id === id;
    const tree = treeify(artifacts, { isRoot });

    const map = ({ id }) => id;
    const ids = flatTree(tree, { map });

    return service.db.del("artifacts", ids);
  });

  return task;
}
