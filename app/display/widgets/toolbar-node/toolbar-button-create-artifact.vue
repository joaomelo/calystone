<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { DialogCreateArtifact } from "@/display/widgets/dialog-create-artifact";
import { ToolbarButton } from "@/utils";
import { computed, useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Directory;
}>();

const { services } = Store.use();
const dialogCreateArtifact = useTemplateRef("dialogCreateArtifact");

const creatable = computed(() => services.createArtifact.createbleOn(parent));
</script>
<template>
  <ToolbarButton
    v-if="creatable.isOk()"
    icon="bxs-file-plus"
    data-test="button-create-artifact"
    @click="dialogCreateArtifact?.open"
  />
  <DialogCreateArtifact
    ref="dialogCreateArtifact"
    :parent="parent"
  />
</template>
