<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import {
  formatDateRange,
  throwCritical,
  useI18n
} from "@/utils";
import { computed } from "vue";

import { OutlineNode } from "../outline-node";
import { useTodoIcon } from "../use-todo-icon";

const { todo } = defineProps<{ todo: TodoArtifact; }>();
const { t } = useI18n();

const icon = useTodoIcon(todo);

const priority = computed(() => {
  return todo.priority() > 0
    ? `${t("common.priority")}: ${todo.priority().toFixed(2)}`
    : "";
});

const criteria = computed(() => {
  const raw = todo.criteria();
  raw.sort((a, b) => a.label.localeCompare(b.label));
  const stringified = raw.map(({
    label,
    value
  }) => {
    return `${label}: ${value.toFixed(2)}`;
  });
  return stringified;
});

const strikethrough = computed(() => {
  return todo.completed();
});

const dates = computed(() => {
  if (!todo.hasDates()) return "";

  const dateStart = todo.dateStart();
  const dateDue = todo.dateDue();
  if (!dateStart || !dateDue) throwCritical("IF_TODO_HAS_DATES_IT_MUST_HAVE_DATES");

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
      <i :class="icon" />
    </template>
    <template #meta>
      <div class="outline-todo__meta">
        <span v-if="tags.length">
          {{ tags }}
        </span>
        <span v-if="dates">
          {{ dates }}
        </span>
        <span v-if="priority">
          {{ priority }}
        </span>
        <span
          v-for="criterion in criteria"
          :key="criterion"
        >
          {{ criterion }}
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
