<script setup lang="ts">
import { EditorWorkspace } from "@/display/views/editor-workspace";
import { useI18n } from "@/utils";

defineProps<{
  message: string;
}>();
const { t } = useI18n();
</script>
<template>
  <EditorWorkspace>
    <div class="editor-message">
      {{ t(message) }}
    </div>
  </EditorWorkspace>
</template>
<style scoped>
.editor-message {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--size-3);
}
</style>