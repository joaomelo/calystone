<script setup lang="ts">
import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(() => {
  // const repository = new MemoryNodesRepository(root);
  // state.nodes.connect(repository);
  throw new Error("open from google drive not implemented");
});
</script>
<template>
  <OpenBase
    label="open.google-drive"
    data-test="open-google-drive"
    icon="bx bxl-google"
    @open="handleOpen"
  />
</template>
