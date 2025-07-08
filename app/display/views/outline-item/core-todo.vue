<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { formatDateTime, throwCritical, truncate, useI18n } from "@/utils";
import { computed } from "vue";

import CoreBase from "./core-base.vue";

const { todo } = defineProps<{
  todo: TodoArtifact;
}>();

const { t } = useI18n();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = todo.isBusy() ? "bx-flashing" : "";

  if (!todo.isLoaded()) {
    return `${iconPrefix} ${loadingEffect} bx-task`;
  }

  if (todo.completed()) {
    return `${iconPrefix} ${loadingEffect} bx-checkbox-checked`;
  }

  const iconGlyph = todo.progress() === "doing"
    ? "bx-checkbox-minus"
    : "bx-checkbox";

  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});

const label = computed(() => {
  return todo.name;
});

const priority = computed(() => {
  const priority = todo.priority().toFixed(2);
  const priorityLabel = todo.priority() > 0
    ? `${t("common.priority.priority")}: ${priority}`
    : "";
  return priorityLabel;
});

const details = computed(() => {
  return todo.hasDetails()
    ? truncate(todo.details, { ellipsis: "...", length: 30 })
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

  const ocurrence = `${formatDateTime(dateStart)} - ${formatDateTime(dateDue)}`;
  const recurrence = todo.hasRecurrence() ? " ↻" : "";

  return `${ocurrence}${recurrence}`;
});

const tags = computed(() => {
  return todo.listTags().join(", ");
});
</script>

<template>
  <CoreBase
    :class="{ 'strikethrough': strikethrough }"
    :icon="icon"
    :label="label"
    class="core-todo"
  >
    <template #meta>
      <div class="core-todo__meta">
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
  </CoreBase>
</template>

<style scoped>
.core-todo.strikethrough :deep(.core-base__main_label) {
  text-decoration: line-through;
}

.core-todo__meta {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  font-size: var(--font-size-0);
}
</style>
