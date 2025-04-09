<script setup lang="ts">
import type { Directory } from "@/domain";

import { DialogCreateArtifact } from "@/display/widgets/dialog-create-artifact";
import { ToolbarButton, useI18n } from "@/utils";
import { useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Directory;
}>();

const { t } = useI18n();
const dialogCreateArtifact = useTemplateRef("dialogCreateArtifact");
</script>
<template>
  <ToolbarButton
    v-tooltip="{ value: t('create-artifact'), showDelay: 500 }"
    icon="bxs-file-plus"
    data-test="button-create-artifact"
    @click="dialogCreateArtifact?.open"
  />
  <DialogCreateArtifact
    ref="dialogCreateArtifact"
    :parent="parent"
  />
</template>
