<script setup lang="ts">
import type { Node } from "@/domain";
import type { Component } from "vue";

import { useI18n } from "@/display/i18n";
import { computed } from "vue";

import type { EditorSwitch } from "../editor-switch";

import { artifactSwitch } from "../editor-artifact";
import { directorySwitch } from "../editor-directory";
import { EditorEmpty } from "../editor-empty";
import { textSwitch } from "../editor-text";

const { node } = defineProps<{
  node?: Node;
}>();

const { t } = useI18n();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [directorySwitch, textSwitch, artifactSwitch];
const editor: Component = computed(() => {
  const specializedSwitch = switchs.find((s) => s.isCompatible(node));
  return specializedSwitch?.component ?? EditorEmpty;
});

// key is important to force the component to be recreated when the node changes and the inner editor is async. without key, editor text, for example, does not update the text content.
const key = computed(() => node?.id ?? "empty");
</script>
<template>
  <div class="editor-node">
    <Suspense>
      <template #default>
        <component
          :is="editor"
          :key
          :node
        />
      </template>
      <template #fallback>
        {{ t('loading') }}...
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.editor-node {
  height: 100%;
}
</style>