<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { AppIcon } from "@/utils";
import { computed } from "vue";

import { OutlineNode } from "../outline-node";

const { todo } = defineProps<{ todo: TodoArtifact; }>();

const strikethrough = computed(() => todo.completed);

const animation = computed(() => {
  return todo.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  if (!todo.isLoaded()) {
    return "square-dashed";
  }

  const { progress } = todo;
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
  <OutlineNode
    :class="{ 'strikethrough': strikethrough }"
    :node="todo"
    class="outline-todo"
  >
    <template #icon>
      <AppIcon
        :name="name"
        :animation="animation"
      />
    </template>
    <template #meta>
      <div class="outline-todo__meta">
        <slot />
      </div>
    </template>
  </OutlineNode>
</template>

<style scoped>
.outline-todo.strikethrough :deep(.outline-node__label) {
  text-decoration: line-through;
}

.outline-todo__meta {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-0);
}
</style>
