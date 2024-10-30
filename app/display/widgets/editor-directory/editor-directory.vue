<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { Directory } from "@/domain";

const { artifact } = defineProps<{
  artifact: Directory;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-empty">
    <p><b>{{ t('directory') }}</b>: {{ artifact.name }}</p>
    <p><b>path</b>: {{ artifact.path() }}</p>
    <p><b>items</b>: {{ artifact.count() }}</p>
  </div>
</template>
<style scoped>
.editor-empty {
  height: 100%;
  padding: var(--size-3);
}
</style>