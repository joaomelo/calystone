<script lang="ts" setup>
import type { Node } from "@/domain";

import ToolbarWorkspace from "./toolbar-workspace.vue";

const { node } = defineProps<{
  node: Node;
}>();
defineEmits<{
  close: []
  rename: [node: Node]
}>();

</script>
<template>
  <div class="editor-workspace">
    <div class="editor-workspace-header">
      <ToolbarWorkspace
        :node="node"
        @close="$emit('close')"
        @rename="$emit('rename', $event)"
      />
    </div>
    <div class="editor-workspace-content">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.editor-workspace {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-workspace-header {
  flex: 0 0 auto;

  & :deep(.p-toolbar) {
    border: none;
    padding: var(--size-1);
  }
}

.editor-workspace-content {
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
