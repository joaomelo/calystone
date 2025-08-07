<script setup>
import { SelectCriterion } from "@/display/views/select-criterion";
</script>
<template>
  <div class="page-priority-filters">
    <SelectCriterion />
  </div>
</template>
<style scoped>
.page-priority-filters {
  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>