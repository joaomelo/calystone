<script setup lang="ts">
import { computed } from "vue";

import type { TodoArtifact } from "@/domain";

import {
  formatDates,
  throwCritical,
  truncate
} from "@/utils";

import OutlineTodoBase from "./outline-todo-base.vue";

const { todo } = defineProps<{ todo: TodoArtifact; }>();

const priority = computed(() => {
  return todo.priority > 0
    ? todo.priority.toFixed(2)
    : "";
});

const details = computed(() => truncate(todo.details, {
  ellipsis: "...",
  length: 30
}));

const dates = computed(() => {
  if (!todo.hasDates) return "";

  const dateStart = todo.start;
  const dateEnd = todo.end;
  if (!dateStart || !dateEnd) throwCritical("TODO_MUST_HAVE_DATES");

  const occurrence = formatDates(dateStart, dateEnd);
  const recurrence = todo.hasRecurrence ? " ↻" : "";

  return `${occurrence}${recurrence}`;
});

const tags = computed(() => todo.tagsLabels.join(", "));
</script>

<template>
  <OutlineTodoBase
    :todo="todo"
  >
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
  </OutlineTodoBase>
</template>
