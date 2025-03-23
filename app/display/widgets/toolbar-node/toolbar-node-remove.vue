<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { ToolbarButton, useDispatch } from "@/utils";

const { node } = defineProps<{
  node: Node;
}>();

const { service } = Store.use();
const { dispatchOrToast, loading } = useDispatch();

async function handleClick() {
  await dispatchOrToast(() => service.nodeRemove.remove(node));
}
</script>
<template>
  <ToolbarButton
    v-if="service.nodeRemove.support(node)"
    icon="bxs-trash"
    data-test="button-remove"
    :loading="loading"
    @click="handleClick"
  />
</template>
