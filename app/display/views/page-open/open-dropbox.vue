<script setup lang="ts">
import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(() => {
  // const repository = new MemoryNodesRepository(root);
  // state.nodes.connect(repository);
  throw new Error("open dropbox not implemented");
});
</script>
<template>
  <OpenBase
    label="open.dropbox"
    data-test="open-dropbox"
    icon="bx bxl-dropbox"
    @open="handleOpen"
  />
</template>
