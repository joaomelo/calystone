import { computed } from "vue";
import { treeify, sort, useDependencies } from "@lib";
import { listArtifacts } from "@body";

export function useTree(parentId, actions) {
  const map = ({ id, name }) => ({
    value: id,
    text: name,
    actions,
  });

  const dependencies = useDependencies();
  const artifacts = computed(() => {
    const list = listArtifacts(dependencies);
    const sorted = sort(list, "order");

    // some use cases provide the parentId as an empty string
    const normalizedParentId = parentId.value || null;
    const isRoot = (a) => a.parentId === normalizedParentId;

    return treeify(sorted, { map, isRoot });
  });
  return artifacts;
}
