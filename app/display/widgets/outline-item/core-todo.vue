<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { computed } from "vue";
import { useI18n } from "vue-i18n";

import CoreBase from "./core-base.vue";

const { todo } = defineProps<{
  todo: TodoArtifact;
}>();

const { t } = useI18n();

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
    class="core-todo"
  >
    <template #meta>
      <div class="core-todo__meta">
        <span v-if="todo.hasTags()">
          {{ t("common.tags") }}: {{ todo.listTags().join(", ") }}
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
  font-size: var(--font-size-0);
}
</style>
