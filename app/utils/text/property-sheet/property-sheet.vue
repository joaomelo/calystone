<script setup lang="ts">
import type { PropertySheetRow } from "./row";

defineProps<{
  rows: PropertySheetRow[];
  title?: string;
}>();
</script>

<template>
  <div class="property-sheet">
    <p
      v-if="title"
      class="property-sheet__title"
    >
      {{ title }}
    </p>
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="property-sheet__row"
    >
      <span
        class="property-sheet__row__label"
        :data-test="`property-sheet-${index}-label`"
      >{{ row.label }}</span>
      <span
        class="property-sheet__row__value"
        :data-test="`property-sheet-${index}-value`"
      >{{ row.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.property-sheet {
  width: 100%;
}

.property-sheet__title {
  font-weight: var(--font-weight-5);
  padding-block: var(--size-1);
}

.property-sheet__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-block: var(--size-1);
  border-bottom: var(--border-size-1) solid var(--p-surface-200);
  gap: var(--size-2);
}

.property-sheet__row__label {
  font-weight: var(--font-weight-5);
  flex-shrink: 0;
}

.property-sheet__row__value {
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
</style>