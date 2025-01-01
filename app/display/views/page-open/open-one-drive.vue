<script setup lang="ts">

import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(() => {
  // const repository = new MemoryNodesRepository(root);
  // state.nodes.connect(repository);
  throw new Error("open from one drive drive not implemented");
});
</script>
<template>
  <OpenBase
    label="open.one-drive"
    data-test="open-one-drive"
    icon="bx bx-cloud"
    @open="handleOpen"
  />
</template>
