<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import {
  formatDateRange,
  throwCritical,
  truncate
} from "@/utils";
import { computed } from "vue";

import { OutlineNode } from "../outline-node";
import TodoIcon from "./todo-icon.vue";

const { todo } = defineProps<{ todo: TodoArtifact; }>();

const priority = computed(() => {
  return todo.priority() > 0
    ? todo.priority().toFixed(2)
    : "";
});

const details = computed(() => {
  return todo.hasDetails()
    ? truncate(todo.details, {
      ellipsis: "...",
      length: 30
    })
    : "";
});

const strikethrough = computed(() => {
  return todo.completed();
});

const dates = computed(() => {
  if (!todo.hasDates()) return "";

  const dateStart = todo.dateStart();
  const dateDue = todo.dateDue();
  if (!dateStart || !dateDue) throwCritical("TODO_MUST_HAVE_DATES");

  const occurrence = formatDateRange({
    due: dateDue,
    start: dateStart
  });
  const recurrence = todo.hasRecurrence() ? " ↻" : "";

  return `${occurrence}${recurrence}`;
});

const tags = computed(() => {
  const list = todo.listTags();
  list.sort((a, b) => a.localeCompare(b));
  return list.join(", ");
});
</script>

<template>
  <OutlineNode
    :class="{ 'strikethrough': strikethrough }"
    :node="todo"
    class="outline-todo"
  >
    <template #icon>
      <TodoIcon :todo="todo" />
    </template>
    <template #meta>
      <div class="outline-todo__meta">
        <span v-if="priority">
          {{ priority }}
        </span>
        <span v-if="dates">
          {{ dates }}
        </span>
        <span v-if="tags.length">
          {{ tags }}
        </span>
        <span v-if="details">
          {{ details }}
        </span>
      </div>
    </template>
  </OutlineNode>
</template>

<style scoped>
.outline-todo.strikethrough :deep(.core-base__main_label) {
  text-decoration: line-through;
}

.outline-todo__meta {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-0);
}
</style>
