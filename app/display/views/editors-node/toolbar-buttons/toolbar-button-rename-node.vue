<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { DialogRename } from "@/display/views/dialog-rename";
import {
  IconCursor,
  ToolbarButton,
  useI18n
} from "@/utils";
import {
  computed,
  useTemplateRef
} from "vue";

const { node } = defineProps<{ node: Node; }>();

const { services } = Store.use();
const { t } = useI18n();
const dialogRename = useTemplateRef("dialogRename");

const renameable = computed(() => services.renameNode.renameable(node));
</script>
<template>
  <ToolbarButton
    v-if="renameable.isOk()"
    v-tooltip="{ value: t('rename'), showDelay: 500 }"
    data-test="button-rename"
    @click="dialogRename?.open"
  >
    <template #icon>
      <IconCursor />
    </template>
  </ToolbarButton>
  <DialogRename
    ref="dialogRename"
    :node="node"
  />
</template>
