<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRemove } from "@/display/widgets/dialog-remove";
import { ToolbarButton } from "@/utils";
import { useTemplateRef } from "vue";

const { node } = defineProps<{
  node: Node;
}>();

const { service } = Store.use();
const dialogRemove = useTemplateRef("dialogRemove");
</script>
<template>
  <ToolbarButton
    v-if="service.nodeRemove.support(node)"
    icon="bxs-trash"
    data-test="button-remove"
    @click="dialogRemove?.remove"
  />
  <DialogRemove
    ref="dialogRemove"
    :node="node"
  />
</template>
