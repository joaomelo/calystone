<script setup lang="ts">
import type { Directory } from "@/domain";

import { computed } from "vue";

import NodeBase from "./node-base.vue";

const { directory } = defineProps<{
  directory: Directory
}>();

const icon = computed(() => {
  const baseIcon = "bx bx-sm";
  const directoryIcon = (directory.isLoaded())
    ? `${baseIcon} bxs-folder`
    : `${baseIcon} bx-folder`;

  if (directory.isBusy()) return `${directoryIcon} bx-flashing`;
  return directoryIcon;
});
</script>
<template>
  <NodeBase
    :icon="icon"
    :label="directory.name"
  />
</template>
