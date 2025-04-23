<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, FieldSet, InputNumber, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

const handleUpdateUrgency = debounce(async (urgency?: number) => {
  artifact.updateUrgency(urgency);
  await services.exchangeArtifact.postFrom(artifact);
}, 200);

const handleUpdateImportance = debounce(async (importance?: number) => {
  artifact.updateImportance(importance);
  await services.exchangeArtifact.postFrom(artifact);
}, 200);
</script>
<template>
  <FieldSet :legend="t('priority.priority')">
    <div class="priority-panel__inputs">
      <InputNumber
        :label="t('priority.importance')"
        data-test="input-importance"
        :locale="locale"
        :model-value="artifact.importance"
        buttons
        size="small"
        @update:model-value="handleUpdateImportance"
      />
      <InputNumber
        :label="t('priority.urgency')"
        data-test="input-urgency"
        :locale="locale"
        :model-value="artifact.urgency"
        buttons
        size="small"
        @update:model-value="handleUpdateUrgency"
      />
    </div>
  </FieldSet>
</template>
<style scoped>
.priority-panel__inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--size-3);
}
</style>
