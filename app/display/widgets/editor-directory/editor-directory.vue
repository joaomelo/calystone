<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";

const { node } = defineProps<{
  node: Directory;
}>();

const { t } = useI18n();
const { nodes } = Store.use();
</script>
<template>
  <div class="editor-directory">
    <p><b>{{ t('items') }}</b>: {{ nodes.descendants(node).length }}</p>
    <p><b>{{ t('path') }}</b>: {{ nodes.path(node) }}</p>
  </div>
</template>
<style scoped>
.editor-directory {
  height: 100%;
  padding: var(--size-3);
}
</style>