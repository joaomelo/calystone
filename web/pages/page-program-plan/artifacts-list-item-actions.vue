<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  ActionsMenu,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const props = defineProps({
  artifact: {
    type: Object,
    default: null,
  },
});

const { artifacts } = useGlobals();
const router = useRouter();

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const editAction = { name: "edit", label: editText.value };
const handleEdit = () =>
  router.push({
    name: "artifactEdit",
    params: { artifactId: props.artifact.id },
  });

const archiveText = useGlobalStateful((i18n) => i18n.t("archive"));
const archiveAction = { name: "archive", label: archiveText.value };
const archiveTask = useTask(() => artifacts.archive(props.artifact.id));

const unarchiveText = useGlobalStateful((i18n) => i18n.t("unarchive"));
const unarchiveAction = { name: "unarchive", label: unarchiveText.value };
const unarchiveTask = useTask(() => artifacts.unarchive(props.artifact.id));

const deleteText = useGlobalStateful((i18n) => i18n.t("delete"));
const deleteAction = { name: "delete", label: deleteText.value };
const deleteTask = useTask(() => artifacts.delete(props.artifact.id));

const actions = computed(() => {
  if (props.artifact.archivedAt) return [unarchiveAction, deleteAction];
  return [editAction, archiveAction, deleteAction];
});

const handleAction = (action) => {
  switch (action) {
    case "edit":
      return handleEdit();
    case "archive":
      return archiveTask.run();
    case "unarchive":
      return unarchiveTask.run();
    case "delete":
      return deleteTask.run();
  }
};
</script>
<template>
  <actions-menu :actions="actions" @action="handleAction" />
</template>
