<script setup lang="ts">
import type { Directory } from "@/domain";

import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { useI18n } from "@/utils";

const { content } = defineProps<{
  content: Directory;
}>();
const { t } = useI18n();
</script>
<template>
  <EditorNodeWorkspace :node="content">
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
  </EditorNodeWorkspace>
</template>
<style scoped>
.editor-directory {
  padding-inline: var(--size-3);
}
</style>