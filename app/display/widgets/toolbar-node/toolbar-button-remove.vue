<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRemove } from "@/display/widgets/dialog-remove";
import { ToolbarButton, useI18n } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { node } = defineProps<{
  node: Node;
}>();
const emit = defineEmits<{
  removed: [Node];
}>();

const { services } = Store.use();
const { t } = useI18n();
const dialogRemove = useTemplateRef<{ remove: () => Promise<boolean> }>("dialogRemove");

const removeable = computed(() => services.nodeRemove.removeable(node));

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
    v-if="removeable.isOk()"
    v-tooltip="{ value: t('delete-node', { name: node.name }), showDelay: 500 }"
    icon="bxs-trash"
    data-test="button-remove"
    @click="handleClick"
  />
  <DialogRemove
    ref="dialogRemove"
    :node="node"
  />
</template>
