import { computed } from "vue";
import { treeify, useI18n } from "@lib";
import { usePilot } from "@body";

export function useTree() {
  const pilot = usePilot();
  const { t } = useI18n();

  const editAction = { value: "edit", text: t("edit") };
  const appendAction = { value: "append", text: t("append") };
  const delAction = { value: "del", text: t("delete") };
  const actions = [editAction, appendAction, delAction];

  const map = (artifact) => ({
    value: artifact.id,
    text: artifact.name,
    actions,
  });

  const artifactsList = pilot.artifacts.computed();
  const artifactsTree = computed(() => treeify(artifactsList.value, { map }));
  return artifactsTree;
}
