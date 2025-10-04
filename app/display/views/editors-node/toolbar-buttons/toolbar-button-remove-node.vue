<script setup lang="ts">
import {
  computed,
  useTemplateRef
} from "vue";

import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRemove } from "@/display/views/dialog-remove";
import {
  AppIcon,
  ToolbarButton,
  useI18n
} from "@/utils";

const { node } = defineProps<{ node: Node; }>();
const emit = defineEmits<{ removed: [Node]; }>();

const { services } = Store.use();
const { t } = useI18n();
const dialogRemove = useTemplateRef<{ remove: () => Promise<boolean> }>("dialogRemove");

const removeable = computed(() => services.removeNode.removeable(node));

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
    data-test="button-remove"
    @click="handleClick"
  >
    <template #icon>
      <AppIcon name="delete" />
    </template>
  </ToolbarButton>
  <DialogRemove
    ref="dialogRemove"
    :node="node"
  />
</template>
