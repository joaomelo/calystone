<script lang="ts" setup>
import type { Node } from "@/domain";

import { ToolbarNode } from "@/display/widgets/toolbar-node";
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
      <ToolbarNode :node="node">
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  overflow: hidden;
}
</style>
