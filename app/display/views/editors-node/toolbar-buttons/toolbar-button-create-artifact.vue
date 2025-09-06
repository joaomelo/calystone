<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogCreateArtifact } from "@/display/views/dialog-create-artifact";
import { Directory } from "@/domain";
import {
  AppIcon,
  ToolbarButton,
  useI18n
} from "@/utils";
import {
  computed,
  useTemplateRef
} from "vue";

const { node } = defineProps<{ node: Node; }>();

const { t } = useI18n();
const { services } = Store.use();
const dialogCreateArtifact = useTemplateRef("dialogCreateArtifact");

const parentOfNewArtifact = computed<Directory | undefined>(() => {
  if (node instanceof Directory) return node;

  return services.queryHierarchy.parent(node);
});
</script>
<template>
  <template v-if="parentOfNewArtifact">
    <ToolbarButton
      v-tooltip="{ value: t('create-artifact'), showDelay: 500 }"
      data-test="button-create-artifact"
      @click="dialogCreateArtifact?.open"
    >
      <template #icon>
        <AppIcon name="file-plus" />
      </template>
    </ToolbarButton>
    <DialogCreateArtifact
      ref="dialogCreateArtifact"
      :parent="parentOfNewArtifact"
    />
  </template>
</template>
