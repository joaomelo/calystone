<script setup lang="ts">
import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(() => {
  // const repository = new MemoryNodesRepository(root);
  // state.nodes.connect(repository);
  throw new Error("open memory not implemented");
});
</script>
<template>
  <OpenBase
    label="open.memory"
    data-test="open-memory"
    icon="bx bx-memory-card"
    @open="handleOpen"
  />
</template>
