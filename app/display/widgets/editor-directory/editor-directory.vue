<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";
import { EditorWorkspace } from "@/display/widgets/editor-workspace";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();
</script>
<template>
  <EditorWorkspace>
    <template #default>
      <div class="editor-directory">
        <p data-test="path">
          <b>{{ t('path') }}</b>: {{ content.path() }}
        </p>
        <p data-test="items">
          <b>{{ t('items') }}</b>: {{ content.descendants().length }}
        </p>
      </div>
    </template>
  </EditorWorkspace>
</template>
<style scoped>
.editor-directory {
  padding-inline: var(--size-3);
}
</style>