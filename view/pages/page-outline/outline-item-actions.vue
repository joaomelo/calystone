<script setup>
import { toValue } from "vue";
import { useI18n, useDependencies, ActionsMenu } from "@lib";
import { addArtifact, delArtifact, activateArtifact, completeArtifact, closeArtifact } from "@body";
import { goArtifactEdit, goOutline } from "@view/pages";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const appendAction = { value: "append", text: t("page-outline.append") };
const delAction = { value: "del", text: t("page-outline.delete") };
const editAction = { value: "edit", text: t("page-outline.edit") };
const focusAction = { value: "focus", text: t("page-outline.focus") };
const activateAction = { value: "activate", text: t("page-outline.activate") };
const completeAction = { value: "complete", text: t("page-outline.complete") };
const closeAction = { value: "close", text: t("page-outline.close") };
const actions = [editAction, appendAction, focusAction, delAction];

const handleAction = (action) => {
  console.log(action);
  const { id } = toValue(props.artifact);
  switch (action) {
    case appendAction.value:
      return addArtifact(dependencies, { parentId: id });
    case delAction.value:
      return delArtifact(dependencies, id);
    case editAction.value:
      return goArtifactEdit(dependencies, id);
    case focusAction.value:
      return goOutline(dependencies, id);
    case activateAction.value:
      return activateArtifact(dependencies, id);
    case completeAction.value:
      return completeArtifact(dependencies, id);
    case closeAction.value:
      return closeArtifact(dependencies, id);
  }
};
</script>

<template>
  <actions-menu class="outline-item-actions" :actions="actions" @action="handleAction" />
</template>
