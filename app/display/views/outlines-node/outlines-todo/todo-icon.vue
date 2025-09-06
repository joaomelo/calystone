<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { AppIcon } from "@/utils";
import { computed } from "vue";

const { todo } = defineProps<{ todo: TodoArtifact; }>();

const animation = computed(() => {
  return todo.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  if (!todo.isLoaded()) {
    return "square-dashed";
  }

  const progress = todo.progress();
  switch (progress) {
    case "doing":
      return "square-square";
    case "done":
      return "square-check";
    case "open":
      return "square";
    case "skipped":
      return "square-x";
    default:
      return "square-dashed";
  }
});
</script>
<template>
  <AppIcon
    :name="name"
    :animation="animation"
  />
</template>
