<script setup lang="ts">
import { CardPanel } from "@/utils";
</script>
<template>
  <div class="frame-plain">
    <CardPanel class="frame-plain__card">
      <template #content>
        <slot />
      </template>
    </CardPanel>
  </div>
</template>
<style scoped>
.frame-plain {
  min-height: 100dvh;
  background-color: var(--p-surface-100);
  display: grid;
  place-items: center;
  padding: var(--size-fluid-1);
}

.frame-plain__card :deep(.p-card-body) {
  gap: 0;
}

.frame-plain__card :deep(.p-card-caption) {
  display: none;
}
</style>