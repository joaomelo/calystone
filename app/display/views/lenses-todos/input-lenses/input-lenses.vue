<script setup lang="ts">
import type { Lenses } from "../lenses";

import SelectCriterion from "./select-criterion.vue";
import SelectTag from "./select-tag.vue";

const model = defineModel<Lenses>({ required: true });
</script>
<template>
  <div class="input-lenses">
    <SelectTag v-model="model.tag" />
    <SelectCriterion v-model="model.criterion" />
  </div>
</template>
<style scoped>
.input-lenses {
  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>