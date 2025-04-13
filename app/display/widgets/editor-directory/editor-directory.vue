<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { PropertySheet, TextMarkdown, TextMessage, useI18n } from "@/utils";
import { computed } from "vue";

const { content } = defineProps<{
  content: Directory;
}>();

const { t } = useI18n();
const { services } = Store.use();

const propertySheetRows = computed(() => {
  return [
    { label: t("path"), value: content.mountPath() },
    { label: t("items"), value: content.descendants().length },
  ];
});

const description = computed(() => {
  return content.description();
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