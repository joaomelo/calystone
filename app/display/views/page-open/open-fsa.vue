<script setup lang="ts">
import { FsaNodesRepository } from "@/repositories";

import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const handleOpen = useOpen(async () => {
  const root = await showDirectoryPicker();
  const repository = new FsaNodesRepository(root);
  return repository;
});
</script>
<template>
  <OpenBase
    label="open.fsa"
    data-test="open-fsa"
    icon="bx bx-hdd"
    @open="handleOpen"
  />
</template>
