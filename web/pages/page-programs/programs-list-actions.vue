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
  program: {
    type: Object,
    default: null,
  },
});

const { strategist } = useGlobals();
const router = useRouter();

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const editAction = { name: "edit", label: editText.value };

const sharingText = useGlobalStateful((i18n) => i18n.t("sharing"));
const sharingAction = { name: "sharing", label: sharingText.value };

const archiveText = useGlobalStateful((i18n) => i18n.t("archive"));
const archiveAction = { name: "archive", label: archiveText.value };
const archiveTask = useTask((id) => strategist.archiveProgram(id));

const unarchiveText = useGlobalStateful((i18n) => i18n.t("unarchive"));
const unarchiveAction = { name: "unarchive", label: unarchiveText.value };
const unarchiveTask = useTask((id) => strategist.unarchiveProgram(id));

const actions = computed(() => {
  if (props.program.archivedAt) return [unarchiveAction];
  return [editAction, archiveAction, sharingAction];
});

const handleAction = (action) => {
  const programId = props.program.id;
  switch (action) {
    case "edit":
      return router.push({
        name: "programEdit",
        params: { programId },
      });
    case "sharing":
      return router.push({
        name: "programSharing",
        params: { programId },
      });
    case "archive":
      return archiveTask.run(props.program.id);
    case "unarchive":
      return unarchiveTask.run(props.program.id);
  }
};
</script>
<template>
  <actions-menu :actions="actions" @action="handleAction" />
</template>
