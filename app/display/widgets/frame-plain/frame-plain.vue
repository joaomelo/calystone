<script setup lang="ts">
import { CardPanel } from "@/utils";
</script>
<template>
  <div class="frame-card">
    <CardPanel>
      <template #content>
        <slot />
      </template>
    </CardPanel>
  </div>
</template>
<style scoped>
.frame-card {
  min-height: 100dvh;
  background-color: var(--p-surface-100);
  display: grid;
  place-items: center;
  padding: var(--size-fluid-2);
}
</style>