<script setup lang="ts">
import type { Artifact } from "@/domain";

import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { useI18n } from "@/utils";
import { filesize } from "filesize";

const { content } = defineProps<{
  content: Artifact;
  remove: boolean;
  rename: boolean;
  share: boolean;
}>();

const { t } = useI18n();
</script>
<template>
  <EditorNodeWorkspace
    :remove
    :rename
    :share
    :node="content"
  >
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
          <b>{{ t('path') }}</b>: {{ content.mountPath() }}
        </p>
      </div>
    </template>
  </EditorNodeWorkspace>
</template>
<style scoped>
.editor-artifact {
  padding-inline: var(--size-3);
}
</style>