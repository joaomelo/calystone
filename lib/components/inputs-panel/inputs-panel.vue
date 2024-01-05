<script setup>
import { useIsAtLeastMedium } from "@lib";
const md = useIsAtLeastMedium();
</script>
<template>
  <div
    class="inputs-panel"
    :class="{ md }"
  >
    <slot />
  </div>
</template>
<style scoped>
.inputs-panel {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}

.inputs-panel.md {
  flex-direction: row;

  & > :deep(*) {
    flex-grow: 1;
  }
}
</style>
