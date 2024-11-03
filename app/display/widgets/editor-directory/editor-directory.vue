<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";
import { count, path } from "@/domain";

const { artifact } = defineProps<{
  artifact: Directory;
}>();

const { t } = useI18n();
</script>
<template>
  <div class="editor-directory">
    <p><b>{{ t('directory') }}</b>: {{ artifact.name }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(artifact) }}</p>
    <p><b>{{ t('items') }}</b>: {{ count(artifact) }}</p>
  </div>
</template>