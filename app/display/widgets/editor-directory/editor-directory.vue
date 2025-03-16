<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/utils";
import { EditorWorkspace } from "@/display/widgets/editor-workspace";

const { content } = defineProps<{
  content: Directory;
}>();
const { t } = useI18n();
</script>
<template>
  <EditorWorkspace :node="content">
    <template #default>
      <div class="editor-directory">
        <p data-test="path">
          <b>{{ t('path') }}</b>: {{ content.mountPath() }}
        </p>
        <p data-test="items">
          <b>{{ t('items') }}</b>: {{ content.getDescendants().length }}
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