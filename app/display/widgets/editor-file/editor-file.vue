<script setup lang="ts">
import type { File } from "@/domain";

import { useI18n } from "@/display/i18n";
import { createPath } from "@/domain";
import { filesize } from "filesize";

import { useWithArtifacts } from "../use-with-artifacts";

const { artifact } = defineProps<{
  artifact: File;
}>();

const path = useWithArtifacts(createPath);
const { t } = useI18n();
</script>
<template>
  <div class="editor-file">
    <p><b>type</b>: {{ artifact.mime }}</p>
    <p><b>size</b>: {{ filesize(artifact.size) }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(artifact) }}</p>
  </div>
</template>
<style scoped>
.editor-file {
  height: 100%;
  padding: var(--size-3);
}
</style>