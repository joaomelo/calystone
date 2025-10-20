<script setup lang="ts">
import { filesize } from "filesize";
import { computed } from "vue";

import type { Artifact } from "@/domain";

import { useI18n } from "@/display/affordances/i18n";
import { PropertySheet } from "@/display/affordances/property-sheet";
import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editors-node/editor-workspace";
import { LinkNodePath } from "@/display/views/link-node-path";
import { formatDateTime } from "@/utils";

import {
  ToolbarButtonCreateArtifact,
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "../toolbar-buttons";

const { content: artifact } = defineProps<{ content: Artifact; }>();
defineEmits<{ close: [] }>();

const { t } = useI18n();
const { services } = Store.use();
const ascendancy = services.spawnCollections.ascendancy();

const propertySheetRows = computed(() => {
  return [
    {
      key: "type",
      label: t("type"),
      value: artifact.mime.media()
    },
    {
      key: "path",
      label: t("path"),
      value: ascendancy.path(artifact)
    },
    {
      key: "size",
      label: t("size"),
      value: filesize(artifact.size)
    },
    {
      key: "last-modified",
      label: t("last-modified"),
      value: formatDateTime(new Date(artifact.lastModified))
    },
  ];
});
</script>
<template>
  <EditorWorkspace
    :node="artifact"
    @close="$emit('close')"
  >
    <template #toolbar>
      <ToolbarButtonCreateArtifact
        :node="artifact"
      />
      <ToolbarButtonRenameNode
        :node="artifact"
      />
      <ToolbarButtonExportNode
        :node="artifact"
      />
      <ToolbarButtonShareNode
        :node="artifact"
      />
      <ToolbarButtonRemoveNode
        :node="artifact"
        @removed="$emit('close')"
      />
    </template>
    <template #default>
      <div class="editor-artifact">
        <PropertySheet
          :rows="propertySheetRows"
          :title="artifact.name"
        >
          <template #value-path="{ row }">
            <LinkNodePath
              :id="artifact.id"
              :path="row.value.toString()"
            />
          </template>
        </PropertySheet>
      </div>
    </template>
  </EditorWorkspace>
</template>
<style scoped>
.editor-artifact {
  padding-inline: var(--size-3);
}
</style>