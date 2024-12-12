<script setup lang="ts">
import type { Artifact } from "@/domain";

import { useI18n } from "@/display/i18n";
import { filesize } from "filesize";

const { node } = defineProps<{
  node: Artifact;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-artifact">
    <p><b>{{ t('type') }}</b>: {{ node.mime.media }}</p>
    <p><b>{{ t('size') }}</b>: {{ filesize(node.size) }}</p>
    <p><b>{{ t('path') }}</b>: {{ node.path() }}</p>
  </div>
</template>
<style scoped>
.editor-artifact {
  height: 100%;
  padding: var(--size-3);
}
</style>