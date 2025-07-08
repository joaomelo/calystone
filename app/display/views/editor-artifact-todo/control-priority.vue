<script setup lang="ts">
import { Store } from "@/display/store";
import { asCriterionValue, type TodoArtifact } from "@/domain";
import { debounce, InputNumber, useI18n } from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

const importance = computed(() => artifact.criterion("importance") ?? 0);
const urgency = computed(() => artifact.criterion("urgency") ?? 0);

const handleUpdateUrgency = debounce(async (urgency?: number) => {
  const criterion = { label: "urgency", value: asCriterionValue(urgency) };
  artifact.prioritize([criterion]);
  await services.exchangeArtifact.postFrom(artifact);
});

const handleUpdateImportance = debounce(async (importance?: number) => {
  const criterion = { label: "importance", value: asCriterionValue(importance) };
  artifact.prioritize([criterion]);
  await services.exchangeArtifact.postFrom(artifact);
});
</script>
<template>
  <div class="control-priority">
    <InputNumber
      :label="t('editor-todo.priority.importance')"
      data-test="input-importance"
      :locale="locale"
      :model-value="importance"
      buttons
      size="small"
      :max="1"
      :min="0"
      :step="0.05"
      :max-fraction-digits="4"
      :min-fraction-digits="2"
      @update:model-value="handleUpdateImportance"
    />
    <InputNumber
      :label="t('editor-todo.priority.urgency')"
      data-test="input-urgency"
      :locale="locale"
      :model-value="urgency"
      buttons
      size="small"
      :max="1"
      :min="0"
      :step="0.05"
      :max-fraction-digits="4"
      :min-fraction-digits="2"
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
