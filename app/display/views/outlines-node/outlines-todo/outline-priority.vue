<script setup lang="ts">
import { computed } from "vue";

import type { TodoArtifact } from "@/domain";

import { useI18n } from "@/display/affordances/i18n";

import OutlineTodoBase from "./outline-todo-base.vue";

const { todo } = defineProps<{ todo: TodoArtifact; }>();
const { t } = useI18n();

const priority = computed(() => {
  return todo.priority > 0
    ? `${t("common.priority")}: ${todo.priority.toFixed(2)}`
    : "";
});

const criteria = computed(() => {
  const raw = todo.criteria;
  const stringified = raw.map(({
    label,
    value
  }) => {
    return `${label}: ${value.toFixed(2)}`;
  });
  return stringified;
});

const tags = computed(() => todo
  .tagsLabels
  .join(", "));
</script>

<template>
  <OutlineTodoBase :todo="todo">
    <span v-if="tags.length">
      {{ tags }}
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
  </OutlineTodoBase>
</template>
