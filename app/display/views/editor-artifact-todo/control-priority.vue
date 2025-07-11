<script setup lang="ts">
import { Store } from "@/display/store";
import { asCriterionValue, type TodoArtifact } from "@/domain";
import { debounce, InputNumber, useI18n } from "@/utils";
import { computed } from "vue";

import ControlCriterionAdd from "./control-criterion-add.vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { locale } = useI18n();

const criteria = computed(() => artifact.criteria());

const handleUpdate = debounce(async (options: { label: string, value?: number }) => {
  const { label, value } = options;
  const criterion = { label, value: asCriterionValue(value) };
  artifact.updateCriterion(criterion);
  await services.exchangeArtifact.postFrom(artifact);
});
</script>
<template>
  <div class="control-priority">
    <template
      v-for="criterion in criteria"
      :key="criterion.label"
    >
      <InputNumber
        :label="criterion.label"
        :data-test="`input-${criterion.label}`"
        :locale="locale"
        :model-value="criterion.value"
        buttons
        size="small"
        :max="1"
        :min="0"
        :step="0.05"
        :max-fraction-digits="4"
        :min-fraction-digits="2"
        @update:model-value="handleUpdate({ label: criterion.label, value: $event })"
      />
    </template>
    <ControlCriterionAdd :artifact="artifact" />
  </div>
</template>
<style scoped>
.control-priority {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
