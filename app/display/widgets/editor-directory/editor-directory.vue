<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";

const { node } = defineProps<{
  node: Directory;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-directory">
    <p><b>{{ t('items') }}</b>: {{ node.descendants().length }}</p>
    <p><b>{{ t('path') }}</b>: {{ node.path() }}</p>
  </div>
</template>
<style scoped>
.editor-directory {
  height: 100%;
  padding: var(--size-3);
}
</style>