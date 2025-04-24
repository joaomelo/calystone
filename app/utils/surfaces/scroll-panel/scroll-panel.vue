<script setup lang="ts">
import ScrollPanelPrimeVue from "primevue/scrollpanel";
</script>
<template>
  <div class="scroll-panel">
    <ScrollPanelPrimeVue class="scroll-panel__scroll">
      <slot />
    </ScrollPanelPrimeVue>
  </div>
</template>
<style scoped>
.scroll-panel,
.scroll-panel__scroll {
  /* this will contain the component between the height boundaries of its parent  */
  height: 100%;
}

.scroll-panel :deep(.p-progressbar) {
  border-radius: 0;
  height: var(--border-size-2);
}
</style>
