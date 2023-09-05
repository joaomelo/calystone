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

const handleEdit = () =>
  router.push({
    name: "artifactEdit",
    params: { artifactId: props.artifact.id },
  });

const archiveTask = useTask(() => artifacts.archive(props.artifact.id));

const unarchiveTask = useTask(() => artifacts.unarchive(props.artifact.id));

const deleteTask = useTask(() => artifacts.delete(props.artifact.id));

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
