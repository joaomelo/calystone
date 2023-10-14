import type { Driver } from "@service";
import type { ItemId } from "@shared";

import { treeify, flatTree } from "@shared";

export function artifactDel(id: ItemId, artifacts: ) {
  const service = useService();
  const artifacts = useArtifacts();

  const { task } = useTask(async (artifactOrId) => {
    const id = artifactOrId?.id || artifactOrId;

    const isRoot = (artifact) => artifact.id === id;
    const tree = treeify(artifacts.value, { isRoot });

    const map = ({ id }) => id;
    const ids = flatTree(tree, { map });

    return service.db.del("artifacts", ids);
  });

  return task;
}
