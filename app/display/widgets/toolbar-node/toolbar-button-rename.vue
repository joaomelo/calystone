<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRename } from "@/display/widgets/dialog-rename";
import { ToolbarButton, useI18n } from "@/utils";
import { useTemplateRef } from "vue";

defineProps<{
  node: Node;
}>();

const { services } = Store.use();
const { t } = useI18n();
const dialogRename = useTemplateRef("dialogRename");
</script>
<template>
  <ToolbarButton
    v-if="services.nodeRename.support(node)"
    v-tooltip="{ value: t('rename'), showDelay: 500 }"
    icon="bxs-rename"
    data-test="button-rename"
    @click="dialogRename?.open"
  />
  <DialogRename
    ref="dialogRename"
    :node="node"
  />
</template>
