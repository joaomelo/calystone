<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { useI18n } from "@/utils";
import { computed } from "vue";

import OutlineTodoBase from "./outline-todo-base.vue";

const { todo } = defineProps<{ todo: TodoArtifact; }>();
const { t } = useI18n();

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

const tags = computed(() => {
  const list = todo.listTags();
  list.sort((a, b) => a.localeCompare(b));
  return list.join(", ");
});
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
