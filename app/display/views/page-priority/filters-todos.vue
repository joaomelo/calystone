<script setup lang="ts">
import type { Filters } from "./filters";

import SelectCriterion from "./select-criterion.vue";

const model = defineModel<Filters>({ required: true });
</script>
<template>
  <div class="filters-todo">
    <SelectCriterion v-model="model.criterion" />
  </div>
</template>
<style scoped>
.filters-todo {
  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>