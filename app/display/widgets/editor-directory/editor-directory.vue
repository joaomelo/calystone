<script setup lang="ts">
import type { Directory } from "@/domain";

import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { PropertySheet, TextMessage, useI18n } from "@/utils";
import { computed } from "vue";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();

const propertySheetRows = computed(() => {
  return [
    { label: t("path"), value: content.mountPath() },
    { label: t("items"), value: content.getDescendants().length },
  ];
});
</script>
<template>
  <EditorNodeWorkspace :node="content">
    <template #default>
      <div class="editor-directory">
        <PropertySheet
          :rows="propertySheetRows"
          :title="`${t('directory')} ${content.name}`"
        />
        <TextMessage v-if="!content.isLoaded()">
          {{ t('directory-unloaded') }}
        </TextMessage>
      </div>
    </template>
  </EditorNodeWorkspace>
</template>
<style scoped>
.editor-directory {
  padding-inline: var(--size-3);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>