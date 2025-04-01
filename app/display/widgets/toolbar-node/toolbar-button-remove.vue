<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRemove } from "@/display/widgets/dialog-remove";
import { ToolbarButton } from "@/utils";
import { useTemplateRef } from "vue";

const { node } = defineProps<{
  node: Node;
}>();
const emit = defineEmits<{
  removed: [Node];
}>();

const { services } = Store.use();
const dialogRemove = useTemplateRef<{ remove: () => Promise<boolean> }>("dialogRemove");
async function handleClick() {
  if (!dialogRemove.value) return;
  const result = await dialogRemove.value.remove();
  if (result) {
    emit("removed", node);
  }
}
</script>
<template>
  <ToolbarButton
    v-if="services.nodeRemove.support(node)"
    icon="bxs-trash"
    data-test="button-remove"
    @click="handleClick"
  />
  <DialogRemove
    ref="dialogRemove"
    :node="node"
  />
</template>
