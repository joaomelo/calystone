<script setup lang="ts">
import type { Directory } from "@/domain";

import { useI18n } from "@/display/i18n";
import { createCount, createPath } from "@/domain";

import { useWithArtifacts } from "../use-with-artifacts";

const { artifact } = defineProps<{
  artifact: Directory;
}>();

const { t } = useI18n();
const count = useWithArtifacts(createCount);
const path = useWithArtifacts(createPath);
</script>
<template>
  <div class="editor-directory">
    <p><b>{{ t('items') }}</b>: {{ count(artifact) }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(artifact) }}</p>
  </div>
</template>
<style scoped>
.editor-directory {
  height: 100%;
  padding: var(--size-3);
}
</style>