<script setup lang="ts">
import type { Progress, TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { InputSelectButton, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const options: { label: string; value: Progress }[] = [
  { label: t("editor-todo.progress.done"), value: "done" },
  { label: t("editor-todo.progress.skipped"), value: "skipped" },
  { label: t("editor-todo.progress.open"), value: "open" },
];

async function handleUpdatedProgress(progress?: string) {
  switch (progress) {
    case "done":
      artifact.progressor.done();
      break;
    case "open":
      artifact.progressor.open();
      break;
    case "skipped":
      artifact.progressor.skip();
      break;
    default: return;
  }

  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <InputSelectButton
    data-test="input-progress"
    :model-value="artifact.progressor.progress"
    default-value="open"
    :options="options"
    @update:model-value="handleUpdatedProgress"
  />
</template>