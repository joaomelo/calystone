<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { DialogCreateDirectory } from "@/display/widgets/dialog-create-directory";
import { ToolbarButton, useI18n } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Directory;
}>();

const { t } = useI18n();
const { services } = Store.use();
const dialogCreateDirectory = useTemplateRef("dialogCreateDirectory");

const creatable = computed(() => services.createDirectory.createbleOn(parent));
</script>
<template>
  <ToolbarButton
    v-if="creatable.isOk()"
    v-tooltip="{ value: t('create-directory'), showDelay: 500 }"
    icon="bxs-folder-plus"
    data-test="button-create-directory"
    @click="dialogCreateDirectory?.open"
  />
  <DialogCreateDirectory
    ref="dialogCreateDirectory"
    :parent="parent"
  />
</template>
