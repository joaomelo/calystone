<script setup lang="ts">
import type {
  Progress, TodoArtifact
} from "@/domain";

import { Store } from "@/display/store";
import { Progressor } from "@/domain";
import {
  InputRadio, useI18n
} from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

interface Option {
  label: string;
  value: Progress;
}

const options: Option[] = [
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
  <InputRadio
    data-test="input-progress"
    :model-value="progress"
    :options="options"
    :label="t('editor-todo.progress.progress')"
    @update:model-value="handleUpdatedProgress"
  />
</template>