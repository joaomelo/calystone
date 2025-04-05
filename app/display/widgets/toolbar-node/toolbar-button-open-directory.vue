<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { ToolbarButton, useDispatch } from "@/utils";

const { node } = defineProps<{
  node: Directory;
}>();

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();

async function handleClick() {
  await dispatchOrToast(() => services.directoryOpen.open(node));
}
</script>
<template>
  <ToolbarButton
    v-if="!node.isLoaded()"
    icon="bxs-folder-open"
    data-test="button-open-directory"
    @click="handleClick"
  />
</template>
