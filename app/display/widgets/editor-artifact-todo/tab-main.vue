<script setup lang="ts">
import type { Progress, TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, InputRichText, InputSelectButton, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const options: { label: string; value: Progress }[] = [
  { label: t("progress.done"), value: "done" },
  { label: t("progress.skipped"), value: "skipped" },
  { label: t("progress.open"), value: "open" },
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

const handleUpdatedetails = debounce(async (text: string) => {
  artifact.details = text;
  await services.exchangeArtifact.postFrom(artifact);
}, 1000);
</script>
<template>
  <div class="tab-main">
    <InputSelectButton
      data-test="input-progress"
      :model-value="artifact.progressor.progress"
      default-value="open"
      :options="options"
      @update:model-value="handleUpdatedProgress"
    />
    <InputRichText
      :label="t('details')"
      data-test="input-details"
      lineless
      :model-value="artifact.details"
      @update:model-value="handleUpdatedetails"
    />
  </div>
</template>
<style scoped>
.tab-main {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>