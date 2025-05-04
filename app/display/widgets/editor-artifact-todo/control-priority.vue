<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, InputNumber, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

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
  <div class="control-priority">
    <InputNumber
      :label="t('editor-todo.priority.importance')"
      data-test="input-importance"
      :locale="locale"
      :model-value="artifact.prioritizer.importance"
      buttons
      size="small"
      @update:model-value="handleUpdateImportance"
    />
    <InputNumber
      :label="t('editor-todo.priority.urgency')"
      data-test="input-urgency"
      :locale="locale"
      :model-value="artifact.prioritizer.urgency"
      buttons
      size="small"
      @update:model-value="handleUpdateUrgency"
    />
  </div>
</template>
<style scoped>
.control-priority {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
