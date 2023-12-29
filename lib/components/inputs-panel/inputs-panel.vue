<script setup>
import { useIsAtLeastMedium } from "@lib";
const md = useIsAtLeastMedium();
</script>
<template>
  <div class="inputs-panel" :class="{ md }">
    <slot></slot>
  </div>
</template>
<style scoped>
.inputs-panel {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}

.inputs-panel.md {
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
}
</style>
