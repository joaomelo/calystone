<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
</script>
<template>
  <Splitter class="master-detail-desktop">
    <SplitterPanel>
      <slot name="master" />
    </SplitterPanel>
    <SplitterPanel>
      <slot name="detail" />
    </SplitterPanel>
  </Splitter>
</template>
<style scoped>
.master-detail-desktop {
  border: none;
}

.master-detail-desktop :deep(.p-splitter-gutter-handle) {
  /* important was required because a inline style is injected via javascript by the library */
  width: var(--border-size-1) !important
}
</style>