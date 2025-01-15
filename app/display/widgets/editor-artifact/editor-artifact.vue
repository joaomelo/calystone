<script setup lang="ts">
import type { Artifact } from "@/domain";

import { useI18n } from "@/display/i18n";
import { EditorWorkspace } from "@/display/widgets/editor-workspace";
import { filesize } from "filesize";

const { content } = defineProps<{
  content: Artifact;
}>();

const { t } = useI18n();
</script>
<template>
  <EditorWorkspace>
    <template #default>
      <div class="editor-artifact">
        <p data-test="type">
          <b>{{ t('type') }}</b>: {{ content.mime.media }}
        </p>
        <p
          v-if="content.size"
          data-test="size"
        >
          <b>{{ t('size') }}</b>: {{ filesize(content.size) }}
        </p>
        <p data-test="path">
          <b>{{ t('path') }}</b>: {{ content.path() }}
        </p>
      </div>
    </template>
  </EditorWorkspace>
</template>
<style scoped>
.editor-artifact {
  padding-inline: var(--size-3);
}
</style>