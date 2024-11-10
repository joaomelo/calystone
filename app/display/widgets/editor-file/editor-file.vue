<script setup lang="ts">
import type { File } from "@/domain";

import { useI18n } from "@/display/i18n";
import { createPath } from "@/domain";
import { filesize } from "filesize";

import { useWithNodes } from "../use-with-nodes";

const { node } = defineProps<{
  node: File;
}>();

const path = useWithNodes(createPath);
const { t } = useI18n();
</script>
<template>
  <div class="editor-file">
    <p><b>type</b>: {{ node.mime }}</p>
    <p><b>size</b>: {{ filesize(node.size) }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(node) }}</p>
  </div>
</template>
<style scoped>
.editor-file {
  height: 100%;
  padding: var(--size-3);
}
</style>