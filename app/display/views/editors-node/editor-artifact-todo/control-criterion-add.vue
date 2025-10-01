<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  ButtonBase,
  InputText,
  useI18n
} from "@/utils";
import {
  computed,
  ref
} from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const label = ref("");

const todos = services.spawnCollections.todos();
const suggestions = computed(() => {
  const globalPrioritizer = todos.tagger();
  const onlyGlobalPriotizer = globalPrioritizer.difference(artifact.criteria);
  return onlyGlobalPriotizer.labels;
});

async function handleAdd() {
  artifact.updateCriterion({ label: label.value });
  await services.exchangeArtifact.postFrom(artifact);

  label.value = "";
}
</script>
<template>
  <div class="control-criterion-add">
    <InputText
      v-model="label"
      class="control-criterion-add__input"
      data-test="control-criterion-add__input"
      :suggestions="suggestions"
      @keydown.enter="handleAdd"
    />
    <ButtonBase
      data-test="control-criterion-add__button"
      :label="t('add')"
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
