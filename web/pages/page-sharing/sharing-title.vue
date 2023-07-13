<script setup>
import { computed } from "vue";
import { useGlobalStateful } from "../../../lib";
import { routesPaths } from "../../router";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const projectsText = useGlobalStateful((i18n) => i18n.t("projects"));

const projectText = useGlobalStateful((projects) => {
  const project = projects.get(props.projectId);
  return project ? project.name : "...";
});
const sharingOf = useGlobalStateful((i18n) => i18n.t("sharingOf"));
const sharingText = computed(() => `${sharingOf.value} ${projectText.value}`);
</script>
<template>
  <div>
    <router-link :to="routesPaths.projects">{{ projectsText }}</router-link>
    <span>&nbsp;>&nbsp;</span>
    <span>{{ sharingText }}</span>
  </div>
</template>
