<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { ButtonBase, debounce, InputRichText, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

async function handleDone() {
  artifact.done();
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleReopen() {
  artifact.reopen();
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleSkip() {
  artifact.skip();
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
      <ButtonBase
        v-if="!artifact.completed()"
        :label="t('progress.done')"
        severity="primary"
        data-test="button-done"
        @click="handleDone"
      />
      <ButtonBase
        v-if="!artifact.completed()"
        :label="t('progress.skip')"
        severity="secondary"
        data-test="button-skip"
        @click="handleSkip"
      />
      <ButtonBase
        v-if="!artifact.uncompleted()"
        :label="t('progress.reopen')"
        severity="secondary"
        data-test="button-reopen"
        @click="handleReopen"
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