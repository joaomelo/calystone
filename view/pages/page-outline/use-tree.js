import { treeify, useI18n, sort, useDependencies } from "@lib";
import { computeArtifacts } from "@body";

export function useTree(parentId) {
  const dependencies = useDependencies();

  const actions = useActions();
  const map = ({ id, name }) => ({
    value: id,
    text: name,
    actions,
  });

  // some use cases provide the parentId as an empty string
  const normalizedParentId = parentId || null;
  const isRoot = (a) => a.parentId === normalizedParentId;

  const artifacts = computeArtifacts(dependencies, (list) => {
    const sorted = sort(list, "order");
    return treeify(sorted, { map, isRoot });
  });
  return artifacts;
}

function useActions() {
  const { t } = useI18n();

  const editAction = { value: "edit", text: t("page-outline.edit") };
  const appendAction = { value: "append", text: t("page-outline.append") };
  const delAction = { value: "del", text: t("page-outline.delete") };
  return [editAction, appendAction, delAction];
}
