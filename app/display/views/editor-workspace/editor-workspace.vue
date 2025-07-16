<script lang="ts" setup>
import {
  ToolbarBase,
  ToolbarButton
} from "@/utils";

defineEmits<{ close: [] }>();

</script>
<template>
  <div class="editor-workspace">
    <ToolbarBase>
      <template #start>
        <slot name="toolbar" />
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
