<script setup lang="ts">
import { useI18n } from "@/display/affordances/i18n";

import { EditorWorkspace } from "../editor-workspace";

defineProps<{ message: string; }>();
defineEmits<{ close: [] }>();

const { t } = useI18n();
</script>
<template>
  <EditorWorkspace
    @close="$emit('close')"
  >
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