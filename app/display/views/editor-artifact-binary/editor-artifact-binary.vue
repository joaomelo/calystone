<script setup lang="ts">
import type { Artifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editor-workspace";
import { ToolbarButtonCreateArtifact, ToolbarButtonExportNode, ToolbarButtonRemoveNode, ToolbarButtonRenameNode, ToolbarButtonShareNode } from "@/display/views/toolbar-buttons";
import { formatDateTime, PropertySheet, useI18n } from "@/utils";
import { filesize } from "filesize";
import { computed } from "vue";

const { content } = defineProps<{
  content: Artifact;
}>();
defineEmits<{
  close: []
}>();

const { t } = useI18n();
const { services } = Store.use();
const propertySheetRows = computed(() => {
  return [
    { label: t("type"), value: content.mime.media() },
    { label: t("path"), value: services.queryHierarchy.path(content) },
    { label: t("size"), value: filesize(content.size) },
    { label: t("last-modified"), value: formatDateTime(new Date(content.lastModified)) },
  ];
});
</script>
<template>
  <EditorWorkspace :node="content">
    <template #toolbar>
      <ToolbarButtonCreateArtifact
        :node="content"
      />
      <ToolbarButtonRenameNode
        :node="content"
      />
      <ToolbarButtonExportNode
        :node="content"
      />
      <ToolbarButtonShareNode
        :node="content"
      />
      <ToolbarButtonRemoveNode
        :node="content"
        @removed="$emit('close')"
      />
    </template>
    <template #default>
      <div class="editor-artifact">
        <PropertySheet
          :rows="propertySheetRows"
          :title="content.name"
        />
      </div>
    </template>
  </EditorWorkspace>
</template>
<style scoped>
.editor-artifact {
  padding-inline: var(--size-3);
}
</style>