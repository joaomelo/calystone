<script setup lang="ts">
import type { Artifact } from "@/domain";

import { useI18n } from "@/display/i18n";

const { artifact } = defineProps<{
  artifact: Artifact;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-empty">
    {{ t('directory') }} {{ artifact.name }}
  </div>
</template>
<style scoped>
.editor-empty {
  height: 100%;
  padding: var(--size-3);
}
</style>