<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";
import { createCount, createPath } from "@/domain";

import { useWithNodes } from "../use-with-nodes";

const { node } = defineProps<{
  node: Directory;
}>();

const { t } = useI18n();
const count = useWithNodes(createCount);
const path = useWithNodes(createPath);
</script>
<template>
  <div class="editor-directory">
    <p><b>{{ t('items') }}</b>: {{ count(node) }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(node) }}</p>
  </div>
</template>
<style scoped>
.editor-directory {
  height: 100%;
  padding: var(--size-3);
}
</style>