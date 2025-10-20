<script setup lang="ts">
import { computed } from "vue";

import type { TodoArtifact } from "@/domain";

import { ButtonBase } from "@/display/affordances/button";
import { useI18n } from "@/display/affordances/i18n";
import { InputNumber } from "@/display/affordances/input-number";
import { InputText } from "@/display/affordances/input-text";
import { Store } from "@/display/store";
import { Criterion } from "@/domain";
import {
  debounce,
  kebabCase
} from "@/utils";

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

const criterion = computed(() => artifact.criterionOrThrow(label));
const kebabedLabel = computed(() => kebabCase(label));

const handleUpdate = debounce(async (value?: number) => {
  const criterion = {
    label,
    value: Criterion.asValue(value)
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
      :data-test="`control-criterion-manage-${kebabedLabel}__label`"
      :model-value="criterion.label"
      readonly
    />
    <InputNumber
      buttons
      class="control-criterion-manage__input"
      :data-test="`control-criterion-manage-${kebabedLabel}__value`"
      :locale="locale"
      :max="1"
      :max-fraction-digits="4"
      :min="0"
      :min-fraction-digits="2"
      :model-value="criterion.value"
      :step="0.05"
      @update:model-value="handleUpdate"
    />
    <ButtonBase
      :data-test="`control-criterion-manage-${kebabedLabel}__delete`"
      :label="t('delete')"
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
