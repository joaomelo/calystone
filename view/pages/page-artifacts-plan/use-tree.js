import { computed } from "vue";
import { treeify, useI18n, sort } from "@lib";
import { useBody } from "@body";

export function useTree() {
  const { artifacts } = useBody();
  const { t } = useI18n();

  const editAction = { value: "edit", text: t("edit") };
  const appendAction = { value: "append", text: t("append") };
  const delAction = { value: "del", text: t("delete") };
  const actions = [editAction, appendAction, delAction];

  const map = ({ id, name, order }) => ({
    value: id,
    text: name + " " + order,
    actions,
  });

  const artifactsList = artifacts.computed((list) => sort(list, "order"));
  const artifactsTree = computed(() => treeify(artifactsList.value, { map }));
  return artifactsTree;
}
