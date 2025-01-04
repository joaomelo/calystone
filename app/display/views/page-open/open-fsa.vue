<script setup lang="ts">
import { Store } from "@/display/store";
import { FsaNodesRepository } from "@/infra";

import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const { fsaService } = Store.use();

const handleOpen = useOpen(async () => {
  const root = await fsaService.openDirectory();
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
