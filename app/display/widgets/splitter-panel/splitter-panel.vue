<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
</script>
<template>
  <Splitter class="splitter-panel">
    <SplitterPanel>
      <slot name="start" />
    </SplitterPanel>
    <SplitterPanel>
      <slot name="end" />
    </SplitterPanel>
  </Splitter>
</template>
<style scoped>
.splitter-panel {
  border: none;
}

.splitter-panel :deep(.p-splitter-gutter-handle) {
  /* important was required because a inline style is injected via javascript by the library */
  width: var(--border-size-1) !important
}
</style>