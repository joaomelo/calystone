<script setup lang="ts">
import {
  computed,
  useTemplateRef
} from "vue";

import type { Node } from "@/domain";

import { useI18n } from "@/display/affordances/i18n";
import { AppIcon } from "@/display/affordances/icons";
import { ToolbarButton } from "@/display/affordances/toolbar";
import { Store } from "@/display/store";
import { DialogRename } from "@/display/views/dialog-rename";

const { node } = defineProps<{ node: Node; }>();

const { services } = Store.use();
const { t } = useI18n();
const dialogRename = useTemplateRef("dialogRename");

const renameable = computed(() => services.renameNode.renameable({ node }));
</script>
<template>
  <ToolbarButton
    v-if="renameable.isOk()"
    v-tooltip="{ value: t('rename'), showDelay: 500 }"
    data-test="button-rename"
    @click="dialogRename?.open"
  >
    <template #icon>
      <AppIcon name="cursor" />
    </template>
  </ToolbarButton>
  <DialogRename
    ref="dialogRename"
    :node="node"
  />
</template>
