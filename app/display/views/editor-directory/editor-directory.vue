<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/views/editor-node-workspace";
import { Ascendancy, Descendancy, Descriptor } from "@/domain";
import { PropertySheet, TextMarkdown, TextMessage, useI18n } from "@/utils";
import { computed } from "vue";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();
const { nodes, services } = Store.use();

const ascendancy = new Ascendancy({ node: content, nodes });
const descendancy = new Descendancy({ directory: content, nodes });
const propertySheetRows = computed(() => {
  return [
    { label: t("path"), value: ascendancy.path() },
    { label: t("items"), value: descendancy.descendants().length },
  ];
});

const descriptor = new Descriptor({ directory: content, nodes });
const description = computed(() => {
  return descriptor.description();
});

const descriptorMissing = computed(() => {
  return services.ensureDescriptor.missing(content).isOk();
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