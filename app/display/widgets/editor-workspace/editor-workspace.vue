<script lang="ts" setup>
import { ButtonBase } from "@/display/widgets/button-base";
import Toolbar from "primevue/toolbar";

defineEmits<{
  close: []
}>();
</script>
<template>
  <div class="editor-workspace">
    <div class="editor-workspace-header">
      <Toolbar>
        <template #end>
          <ButtonBase
            icon="bx bx-sm bx-x"
            severity="secondary"
            text
            @click="$emit('close')"
          />
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
