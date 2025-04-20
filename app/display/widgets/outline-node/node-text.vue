<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { computed } from "vue";

import NodeBase from "./node-base.vue";

const { text } = defineProps<{
  text: TextArtifact
}>();

const icon = computed(() => {
  const baseIcon = "bx bx-sm";
  const textIcon = (text.isLoaded())
    ? `${baseIcon} bxs-file-txt`
    : `${baseIcon} bx-file-blank`;

  if (text.isBusy()) return `${textIcon} bx-flashing`;
  return textIcon;
});
</script>
<template>
  <NodeBase
    :icon="icon"
    :label="text.name"
  />
</template>
