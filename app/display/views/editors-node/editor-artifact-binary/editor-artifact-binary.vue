<script setup lang="ts">
import type { Artifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editors-node/editor-workspace";
import { LinkNodePath } from "@/display/views/link-node-path";
import {
  formatDateTime,
  PropertySheet,
  useI18n
} from "@/utils";
import { filesize } from "filesize";
import { computed } from "vue";

import {
  ToolbarButtonCreateArtifact,
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "../toolbar-buttons";

const { content } = defineProps<{ content: Artifact; }>();
defineEmits<{ close: [] }>();

const { t } = useI18n();
const { services } = Store.use();
const propertySheetRows = computed(() => {
  return [
    {
      key: "type",
      label: t("type"),
      value: content.mime.media()
    },
    {
      key: "path",
      label: t("path"),
      value: services.queryHierarchy.path(content)
    },
    {
      key: "size",
      label: t("size"),
      value: filesize(content.size)
    },
    {
      key: "last-modified",
      label: t("last-modified"),
      value: formatDateTime(new Date(content.lastModified))
    },
  ];
});
</script>
<template>
  <EditorWorkspace
    :node="content"
    @close="$emit('close')"
  >
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
        >
          <template #value-path="{ row }">
            <LinkNodePath
              :id="content.id"
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