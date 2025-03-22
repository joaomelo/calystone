<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRename } from "@/display/widgets/dialog-rename";
import { ToolbarButton } from "@/utils";
import { useTemplateRef } from "vue";

defineProps<{
  node: Node;
}>();

const { service } = Store.use();
const dialogRename = useTemplateRef("dialogRename");
</script>
<template>
  <ToolbarButton
    v-if="service.nodeRename.support(node)"
    icon="bxs-rename"
    data-test="button-rename"
    @click="dialogRename?.open"
  />
  <DialogRename
    ref="dialogRename"
    :node="node"
  />
</template>
