<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogCreateDirectory } from "@/display/widgets/dialog-create-directory";
import { ToolbarButton } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Node;
}>();

const { services } = Store.use();
const dialogCreateDirectory = useTemplateRef("dialogCreateDirectory");

const creatable = computed(() => services.createDirectory.createbleOn(parent));
</script>
<template>
  <ToolbarButton
    v-if="creatable.isOk()"
    icon="bxs-folder-plus"
    data-test="button-create-directory"
    @click="dialogCreateDirectory?.open"
  />
  <DialogCreateDirectory
    ref="dialogCreateDirectory"
    :parent="parent"
  />
</template>
