<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { computed } from "vue";

import CoreBase from "./core-base.vue";

const { todo } = defineProps<{
  todo: TodoArtifact;
}>();

const visuals = computed<{ icon: string; strikethrough: boolean }>(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = todo.isBusy() ? "bx-flashing" : "";

  if (!todo.isLoaded()) {
    return {
      icon: `${iconPrefix} ${loadingEffect} bx-task`,
      strikethrough: false
    };
  }

  if (todo.completed()) {
    return {
      icon: `${iconPrefix} ${loadingEffect} bx-checkbox-checked`,
      strikethrough: true
    };
  }

  const iconGlyph = todo.progress() === "doing"
    ? "bx-checkbox-minus"
    : "bx-checkbox";

  return {
    icon: `${iconPrefix} ${loadingEffect} ${iconGlyph}`,
    strikethrough: false
  };
});

</script>

<template>
  <CoreBase
    :class="{ 'strikethrough': visuals.strikethrough }"
    :icon="visuals.icon"
    :label="todo.name"
  />
</template>

<style scoped>
.strikethrough :deep(.core-base__main_label) {
  text-decoration: line-through;
}
</style>
