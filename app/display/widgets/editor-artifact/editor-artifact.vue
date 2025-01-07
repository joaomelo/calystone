<script setup lang="ts">
import type { Artifact } from "@/domain";

import { useI18n } from "@/display/i18n";
import { filesize } from "filesize";

const { content } = defineProps<{
  content: Artifact;
}>();

const { t } = useI18n();
</script>
<template>
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
<style scoped>
.editor-artifact {
  height: 100%;
  padding: var(--size-3);
}
</style>