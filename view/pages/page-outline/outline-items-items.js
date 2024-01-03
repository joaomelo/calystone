import { computed } from "vue";
import { treeify, sort, useDependencies, truncate } from "@lib";
import { listArtifacts } from "@body";

export function useItems(parentId) {
  const dependencies = useDependencies();
  const map = (artifact) => ({
    value: artifact.id,
    tooltip: truncate(artifact.notes, 100),
  });

  const artifacts = computed(() => {
    const list = listArtifacts(dependencies);
    const sorted = sort(list, "order");

    // some use cases provide the parentId as an empty string and that need to be updated to null
    const normalizedParentId = parentId.value || null;
    const isRoot = (a) => a.parentId === normalizedParentId;

    return treeify(sorted, { map, isRoot });
  });

  return artifacts;
}
