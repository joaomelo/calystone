<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { DialogCreateFile } from "@/display/widgets/dialog-create-file";
import { ToolbarButton } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Directory;
}>();

const { services } = Store.use();
const dialogCreateFile = useTemplateRef("dialogCreateFile");

const creatable = computed(() => services.createFile.createbleOn(parent));
</script>
<template>
  <ToolbarButton
    v-if="creatable.isOk()"
    icon="bxs-file-plus"
    data-test="button-create-file"
    @click="dialogCreateFile?.open"
  />
  <DialogCreateFile
    ref="dialogCreateFile"
    :parent="parent"
  />
</template>
