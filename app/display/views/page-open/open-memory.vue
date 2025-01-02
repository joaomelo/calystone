<script setup lang="ts">
import { MemoryNodesRepository } from "@/repositories";

import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(() => {
  const repository = new MemoryNodesRepository();
  return Promise.resolve(repository);
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
