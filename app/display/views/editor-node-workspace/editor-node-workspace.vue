<script lang="ts" setup>
import type { Node } from "@/domain";

import { ToolbarNode } from "@/display/views/toolbar-node";
import { ToolbarButton } from "@/utils";

defineProps<{
  node: Node;
}>();
defineEmits<{
  close: []
}>();

</script>
<template>
  <div class="editor-node-workspace">
    <div class="editor-node-workspace__header">
      <ToolbarNode
        :node="node"
        @removed="$emit('close')"
      >
        <template #end>
          <ToolbarButton
            icon="bx-x"
            @click="$emit('close')"
          />
        </template>
      </ToolbarNode>
    </div>
    <div class="editor-node-workspace__content">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.editor-node-workspace {
  display: flex;
  flex-direction: column;
}

.editor-node-workspace__header {
  flex: 0 0 auto;

  & :deep(.p-toolbar) {
    border: none;
    padding: var(--size-1);
  }
}

.editor-node-workspace__content {
  flex: 1 1 auto;
}
</style>
