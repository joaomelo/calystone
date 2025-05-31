<script setup lang="ts">
import type { Node } from "@/domain";

import { DialogCreateArtifact } from "@/display/views/dialog-create-artifact";
import { Directory } from "@/domain";
import { ToolbarButton, useI18n } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { node } = defineProps<{
  node: Node;
}>();

const { t } = useI18n();
const dialogCreateArtifact = useTemplateRef("dialogCreateArtifact");

const parentOfNewArtifact = computed<Directory | undefined>(() => {
  if (node instanceof Directory) return node;
  return node.parent();
});
</script>
<template>
  <template v-if="parentOfNewArtifact">
    <ToolbarButton
      v-tooltip="{ value: t('create-artifact'), showDelay: 500 }"
      icon="bxs-file-plus"
      data-test="button-create-artifact"
      @click="dialogCreateArtifact?.open"
    />
    <DialogCreateArtifact
      ref="dialogCreateArtifact"
      :parent="parentOfNewArtifact"
    />
  </template>
</template>
