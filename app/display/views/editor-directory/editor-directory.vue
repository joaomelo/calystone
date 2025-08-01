<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editor-workspace";
import {
  ToolbarButtonCreateArtifact,
  ToolbarButtonCreateDirectory,
  ToolbarButtonOpenDirectory,
  ToolbarButtonReloadDirectory,
  ToolbarButtonRemoveNode
} from "@/display/views/toolbar-buttons";
import {
  PropertySheet,
  TextMarkdown,
  TextMessage,
  useI18n
} from "@/utils";
import { computed } from "vue";

const { content } = defineProps<{ content: Directory; }>();
defineEmits<{ close: [] }>();

const { t } = useI18n();
const { services } = Store.use();

const propertySheetRows = computed(() => {
  const descendants = services.queryHierarchy.descendants(content);
  return [
    {
      label: t("path"),
      value: services.queryHierarchy.path(content)
    },
    {
      label: t("items"),
      value: descendants.length
    },
  ];
});

const description = computed(() => {
  return services.ensureDescriptor.description(content);
});

const descriptorMissing = computed(() => {
  return services.ensureDescriptor.has(content).isFail();
});
</script>
<template>
  <EditorWorkspace
    :node="content"
    @close="$emit('close')"
  >
    <template #toolbar>
      <ToolbarButtonOpenDirectory
        :directory="content"
      />
      <ToolbarButtonReloadDirectory
        :directory="content"
      />
      <ToolbarButtonCreateDirectory
        :parent="content"
      />
      <ToolbarButtonCreateArtifact
        :node="content"
      />
      <ToolbarButtonRemoveNode
        :node="content"
        @removed="$emit('close')"
      />
    </template>
    <template #default>
      <div class="editor-directory">
        <PropertySheet
          :rows="propertySheetRows"
          :title="`${t('directory')} ${content.name}`"
        />
        <TextMessage
          v-if="!content.isLoaded()"
          data-test="tip-unloaded"
        >
          {{ t('directory-unloaded') }}
        </TextMessage>
        <TextMessage
          v-if="descriptorMissing"
          data-test="descriptor-tip"
        >
          {{ t('descriptor-tip') }}
        </TextMessage>
        <TextMarkdown
          v-if="description"
          data-test="descriptor-content"
          :markdown="description"
        />
      </div>
    </template>
  </EditorWorkspace>
</template>
<style scoped>
.editor-directory {
  padding-inline: var(--size-3);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>