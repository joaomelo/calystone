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
  <div class="editor-workspace">
    <div class="editor-workspace__header">
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
    <div class="editor-workspace__content">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.editor-workspace {
  display: flex;
  flex-direction: column;
}

.editor-workspace__header {
  flex: 0 0 auto;

  & :deep(.p-toolbar) {
    border: none;
    padding: var(--size-1);
  }
}

.editor-workspace__content {
  flex: 1 1 auto;
}
</style>
