<script setup lang="ts">
import type {
  Progress, TodoArtifact
} from "@/domain";

import { Store } from "@/display/store";
import { Progressor } from "@/domain";
import {
  ButtonBase, useI18n
} from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const options: {
  label: string;
  value: Progress
}[] = [
  {
    label: t("editor-todo.progress.open"),
    value: "open"
  },
  {
    label: t("editor-todo.progress.doing"),
    value: "doing"
  },
  {
    label: t("editor-todo.progress.done"),
    value: "done"
  },
  {
    label: t("editor-todo.progress.skipped"),
    value: "skipped"
  },
] as const;

const progress = computed(() => artifact.progress());

async function handleUpdatedProgress(progress?: string) {
  if (!Progressor.isProgress(progress)) return;
  artifact.updateProgress(progress);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div>
    <p>{{ t('editor-todo.progress.update') }}</p>
    <div class="control-progress__buttons">
      <template
        v-for="option in options"
        :key="option.value"
      >
        <ButtonBase
          :disabled="option.value === progress"
          :label="option.label"
          severity="secondary"
          :data-test="`button-${option.value}`"
          @click="handleUpdatedProgress(option.value)"
        />
      </template>
    </div>
  </div>
</template>
<style scoped>
.control-progress__buttons {
  display: flex;
  flex-direction: row;
  gap: var(--size-2);
  margin-block-start: var(--size-2)
}
</style>