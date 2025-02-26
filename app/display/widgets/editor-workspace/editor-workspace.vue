<script lang="ts" setup>
import { ToolbuttonClose } from "@/display/widgets/toolbar-buttons";
import Toolbar from "primevue/toolbar";

defineEmits<{
  close: []
}>();
</script>
<template>
  <div class="editor-workspace">
    <div class="editor-workspace-header">
      <Toolbar>
        <template #start>
          <slot name="toolbar" />
        </template>
        <template #end>
          <ToolbuttonClose @click="$emit('close')" />
        </template>
      </Toolbar>
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
