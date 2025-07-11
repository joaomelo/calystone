<script setup lang="ts">
import { Store } from "@/display/store";
import { asCriterionValue, type TodoArtifact } from "@/domain";
import { ButtonBase, debounce, InputNumber, useI18n } from "@/utils";
import { computed } from "vue";

const { artifact, label } = defineProps<{
  artifact: TodoArtifact;
  label: string;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

const criterion = computed(() => artifact.criterion(label));

const handleUpdate = debounce(async (value?: number) => {
  const criterion = { label, value: asCriterionValue(value) };
  artifact.updateCriterion(criterion);
  await services.exchangeArtifact.postFrom(artifact);
});

async function handleDelete() {
  artifact.removeCriterion(label);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div class="control-criterion-manage">
    <InputNumber
      class="control-criterion-manage__input"
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
      @update:model-value="handleUpdate"
    />
    <ButtonBase
      :label="t('delete')"
      data-test="control-criterion-manage__delete"
      @click="handleDelete"
    />
  </div>
</template>
<style scoped>
.control-criterion-manage {
  display: flex;
  gap: var(--size-2);
}

.control-criterion-manage__input {
  flex: 1;
}
</style>
