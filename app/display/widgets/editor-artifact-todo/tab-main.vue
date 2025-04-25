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
      artifact.done();
      break;
    case "open":
      artifact.reopen();
      break;
    case "skipped":
      artifact.skip();
      break;
    default: return;
  }

  await services.exchangeArtifact.postFrom(artifact);
}

const handleUpdatedetails = debounce(async (text: string) => {
  artifact.updateDetails(text);
  await services.exchangeArtifact.postFrom(artifact);
}, 1000);
</script>
<template>
  <div class="tab-main">
    <div class="tab-main__progress">
      <InputSelectButton
        data-test="input-progress"
        :model-value="artifact.progressor.progress"
        default-value="open"
        :options="options"
        @update:model-value="handleUpdatedProgress"
      />
    </div>
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

.tab-main__progress {
  display: flex;
  gap: var(--size-2);
}
</style>