<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-directory">
    <p data-test="items">
      <b>{{ t('items') }}</b>: {{ content.descendants().length }}
    </p>
    <p data-test="path">
      <b>{{ t('path') }}</b>: {{ content.path() }}
    </p>
  </div>
</template>
<style scoped>
.editor-directory {
  height: 100%;
  padding: var(--size-3);
}
</style>