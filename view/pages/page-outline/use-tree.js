import { computed } from "vue";
import { treeify, useI18n, sort } from "@lib";
import { useBody } from "@body";

export function useTree() {
  const { artifacts } = useBody();
  const { t } = useI18n();

  const editAction = { value: "edit", text: t("page-outline.edit") };
  const appendAction = { value: "append", text: t("page-outline.append") };
  const delAction = { value: "del", text: t("page-outline.delete") };
  const actions = [editAction, appendAction, delAction];

  const map = ({ id, name }) => ({
    value: id,
    text: name,
    actions,
  });

  const artifactsList = artifacts.computed((list) => sort(list, "order"));
  const artifactsTree = computed(() => treeify(artifactsList.value, { map }));
  return artifactsTree;
}
