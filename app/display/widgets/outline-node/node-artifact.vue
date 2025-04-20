<script setup lang="ts">
import type { Artifact } from "@/domain";

import { computed } from "vue";

import NodeBase from "./node-base.vue";

const { artifact } = defineProps<{
  artifact: Artifact
}>();

const icon = computed(() => {
  const baseIcon = "bx bx-sm";
  const artifactIcon = (artifact.isLoaded())
    ? `${baseIcon} bxs-file`
    : `${baseIcon} bx-file`;

  if (artifact.isBusy()) return `${artifactIcon} bx-flashing`;
  return artifactIcon;
});
</script>
<template>
  <NodeBase
    :icon="icon"
    :label="artifact.name"
  />
</template>
