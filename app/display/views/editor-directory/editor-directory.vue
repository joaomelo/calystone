<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/views/editor-node-workspace";
import { PropertySheet, TextMarkdown, TextMessage, useI18n } from "@/utils";
import { computed } from "vue";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();
const { services } = Store.use();

const propertySheetRows = computed(() => {
  const descendants = services.queryHierarchy.descendants(content);
  return [
    { label: t("path"), value: services.queryHierarchy.path(content) },
    { label: t("items"), value: descendants.length },
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
  <EditorNodeWorkspace :node="content">
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