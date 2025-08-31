<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { asCriterionValue } from "@/domain";
import {
  ButtonBase,
  debounce,
  InputNumber,
  InputText,
  kebabCase,
  useI18n
} from "@/utils";
import { computed } from "vue";

const {
  artifact,
  label
} = defineProps<{
  artifact: TodoArtifact;
  label: string;
}>();

const { services } = Store.use();
const {
  locale,
  t
} = useI18n();

const criterion = computed(() => artifact.criterion(label));
const kebabedLabel = computed(() => kebabCase(label));

const handleUpdate = debounce(async (value?: number) => {
  const criterion = {
    label,
    value: asCriterionValue(value)
  };
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
    <InputText
      :model-value="criterion.label"
      :data-test="`control-criterion-manage-${kebabedLabel}__label`"
      readonly
    />
    <InputNumber
      class="control-criterion-manage__input"
      :data-test="`control-criterion-manage-${kebabedLabel}__value`"
      :locale="locale"
      :model-value="criterion.value"
      buttons
      :max="1"
      :min="0"
      :step="0.05"
      :max-fraction-digits="4"
      :min-fraction-digits="2"
      @update:model-value="handleUpdate"
    />
    <ButtonBase
      :label="t('delete')"
      :data-test="`control-criterion-manage-${kebabedLabel}__delete`"
      @click="handleDelete"
    />
  </div>
</template>
<style scoped>
.control-criterion-manage {
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: subgrid;
}
</style>
