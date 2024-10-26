<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
</script>
<template>
  <Splitter>
    <SplitterPanel>
      <slot name="start" />
    </SplitterPanel>
    <SplitterPanel>
      <slot name="end" />
    </SplitterPanel>
  </Splitter>
</template>