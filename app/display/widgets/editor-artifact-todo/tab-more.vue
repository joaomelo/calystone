<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, FieldSet, InputNumber, useI18n } from "@/utils";
import { computed } from "vue";

import SectionTags from "./section-tags.vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

const priorityLegend = computed(() => {
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
  <div class="tab-more">
    <SectionTags :artifact="artifact" />
    <FieldSet :legend="priorityLegend">
      <div class="tab-more__priority-inputs">
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
  </div>
</template>
<style scoped>
.tab-more {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}

.tab-more__priority-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--size-3);
}
</style>
