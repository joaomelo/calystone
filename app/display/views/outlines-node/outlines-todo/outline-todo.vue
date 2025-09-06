<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import {
  formatDateRange,
  throwCritical,
  truncate
} from "@/utils";
import { computed } from "vue";

import OutlineTodoBase from "./outline-todo-base.vue";

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
