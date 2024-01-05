<script setup>
import { useIsAtLeastMedium } from "@lib";
const md = useIsAtLeastMedium();
</script>
<template>
  <div
    class="buttons-panel"
    :class="{ md }"
  >
    <slot />
  </div>
</template>
<style scoped>
.buttons-panel {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}

.buttons-panel.md {
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
}
</style>
