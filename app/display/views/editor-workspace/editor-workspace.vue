<script lang="ts" setup>
import type { Node } from "@/domain";

import { ToolbarButtonCreateArtifact, ToolbarButtonCreateDirectory, ToolbarButtonExportNode, ToolbarButtonOpenDirectory, ToolbarButtonRemoveNode, ToolbarButtonRenameNode, ToolbarButtonShareNode } from "@/display/views/toolbar-buttons";
import { Directory } from "@/domain";
import { ToolbarBase, ToolbarButton } from "@/utils";

defineProps<{
  node: Node;
}>();
defineEmits<{
  close: []
}>();

</script>
<template>
  <div class="editor-workspace">
    <ToolbarBase
      :node="node"
      @removed="$emit('close')"
    >
      <template #start>
        <template v-if="node">
          <ToolbarButtonOpenDirectory
            v-if="(node instanceof Directory)"
            :parent="node"
          />
          <ToolbarButtonCreateDirectory
            v-if="(node instanceof Directory)"
            :parent="node"
          />
          <ToolbarButtonCreateArtifact
            :node="node"
          />
          <ToolbarButtonRenameNode
            :node="node"
          />
          <ToolbarButtonExportNode
            :node="node"
          />
          <ToolbarButtonShareNode
            :node="node"
          />
          <ToolbarButtonRemoveNode
            :node="node"
            @removed="$emit('close')"
          />
        </template>
      </template>
      <template #end>
        <ToolbarButton
          icon="bx-x"
          @click="$emit('close')"
        />
      </template>
    </ToolbarBase>
  </div>
  <div class="editor-workspace__content">
    <slot />
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
