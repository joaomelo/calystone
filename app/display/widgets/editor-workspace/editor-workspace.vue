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
.editor-workspace,
.editor-workspace-content {
  height: 100%;
}

.editor-workspace-header {
  & :deep(.p-toolbar) {
    border: none;
    padding: var(--size-1);
  }
}
</style>
