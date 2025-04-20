<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { computed } from "vue";

import NodeBase from "./node-base.vue";

const { todo } = defineProps<{
  todo: TodoArtifact
}>();

const icon = computed(() => {
  const baseIcon = "bx bx-sm";
  const todoIcon = !todo.isLoaded()
    ? `${baseIcon} bx-task`
    : todo.completed()
      ? `${baseIcon} bx-checkbox-checked`
      : `${baseIcon} bx-checkbox`;

  if (todo.isBusy()) return `${todoIcon} bx-flashing`;
  return todoIcon;
});
</script>
<template>
  <NodeBase
    :icon="icon"
    :label="todo.name"
    :class="{ 'completed': todo.completed() }"
  />
</template>
<style scoped>
.completed :deep(p) {
  text-decoration: line-through;
}
</style>