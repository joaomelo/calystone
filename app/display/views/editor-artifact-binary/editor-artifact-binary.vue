<script setup lang="ts">
import type { Artifact } from "@/domain";

import { EditorNodeWorkspace } from "@/display/views/editor-node-workspace";
import { formatDateTime, PropertySheet, useI18n } from "@/utils";
import { filesize } from "filesize";
import { computed } from "vue";

const { content } = defineProps<{
  content: Artifact;
}>();

const { t } = useI18n();

const propertySheetRows = computed(() => {
  return [
    { label: t("type"), value: content.mime.media() },
    { label: t("path"), value: content.mountPath() },
    { label: t("size"), value: filesize(content.size) },
    { label: t("last-modified"), value: formatDateTime(new Date(content.lastModified)) },
  ];
});
</script>
<template>
  <EditorNodeWorkspace :node="content">
    <template #default>
      <div class="editor-artifact">
        <PropertySheet
          :rows="propertySheetRows"
          :title="content.name"
        />
      </div>
    </template>
  </EditorNodeWorkspace>
</template>
<style scoped>
.editor-artifact {
  padding-inline: var(--size-3);
}
</style>