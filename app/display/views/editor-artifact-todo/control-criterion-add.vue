<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { asCriterionValue } from "@/domain";
import {
  ButtonBase, InputText, useI18n
} from "@/utils";
import {
  computed, ref
} from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const label = ref("");

const suggestions = computed(() => {
  const allLabels = services.computeCriteria.labels();
  const usedLabels = artifact.criteria().map(({ label }) => label);
  const availableLabels = allLabels.difference(new Set(usedLabels));

  const list = Array.from(availableLabels);
  list.sort((a, b) => a.localeCompare(b));
  return list;
});

async function handleAdd() {
  const criterion = {
    label: label.value,
    value: asCriterionValue(0),
  };
  artifact.updateCriterion(criterion);
  await services.exchangeArtifact.postFrom(artifact);

  label.value = "";
}
</script>
<template>
  <div class="control-criterion-add">
    <InputText
      v-model="label"
      data-test="control-criterion-add__input"
      class="control-criterion-add__input"
      :suggestions="suggestions"
      @keydown.enter="handleAdd"
    />
    <ButtonBase
      :label="t('add')"
      data-test="control-criterion-add__button"
      @click="handleAdd"
    />
  </div>
</template>
<style scoped>
.control-criterion-add {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}

.control-criterion-add__input {
  grid-column: span 2;
}
</style>
