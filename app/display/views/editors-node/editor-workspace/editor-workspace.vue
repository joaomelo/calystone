<script lang="ts" setup>
import {
  AppIcon,
  ToolbarBase,
  ToolbarButton
} from "@/utils";

defineEmits<{ close: [] }>();

</script>
<template>
  <div class="editor-workspace">
    <div class="editor-workspace__header">
      <ToolbarBase>
        <template #start>
          <slot name="toolbar" />
        </template>
        <template #end>
          <ToolbarButton
            @click="$emit('close')"
          >
            <template #icon>
              <AppIcon name="circle-x" />
            </template>
          </ToolbarButton>
        </template>
      </ToolbarBase>
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
  height: 100%;
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
  overflow: auto;
}
</style>
