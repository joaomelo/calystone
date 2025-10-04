<script setup lang="ts">
import { useTemplateRef } from "vue";

import type { Directory } from "@/domain";

import { DialogCreateDirectory } from "@/display/views/dialog-create-directory";
import {
  AppIcon,
  ToolbarButton,
  useI18n
} from "@/utils";

const { parent } = defineProps<{ parent: Directory; }>();

const { t } = useI18n();
const dialogCreateDirectory = useTemplateRef("dialogCreateDirectory");
</script>
<template>
  <ToolbarButton
    v-tooltip="{ value: t('create-directory'), showDelay: 500 }"
    data-test="button-create-directory"
    @click="dialogCreateDirectory?.open"
  >
    <template #icon>
      <AppIcon name="directory-plus" />
    </template>
  </ToolbarButton>
  <DialogCreateDirectory
    ref="dialogCreateDirectory"
    :parent="parent"
  />
</template>
