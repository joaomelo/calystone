<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, FieldSet, InputNumber, useI18n } from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

const legend = computed(() => {
  return `${t("priority.priority")}: ${artifact.prioritizer.priority().toString()}`;
});

const handleUpdateUrgency = debounce(async (urgency?: number) => {
  artifact.prioritizer.urgency = urgency ?? 0;
  await services.exchangeArtifact.postFrom(artifact);
}, 200);

const handleUpdateImportance = debounce(async (importance?: number) => {
  artifact.prioritizer.importance = importance ?? 0;
  await services.exchangeArtifact.postFrom(artifact);
}, 200);
</script>
<template>
  <FieldSet :legend="legend">
    <div class="priority-panel__inputs">
      <InputNumber
        :label="t('priority.importance')"
        data-test="input-importance"
        :locale="locale"
        :model-value="artifact.prioritizer.importance"
        buttons
        size="small"
        @update:model-value="handleUpdateImportance"
      />
      <InputNumber
        :label="t('priority.urgency')"
        data-test="input-urgency"
        :locale="locale"
        :model-value="artifact.prioritizer.urgency"
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
