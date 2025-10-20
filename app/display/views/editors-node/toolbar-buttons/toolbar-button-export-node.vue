<script setup lang="ts">
import { computed } from "vue";

import type { Node } from "@/domain";

import { useDispatch } from "@/display/affordances/dispatch";
import { useI18n } from "@/display/affordances/i18n";
import { AppIcon } from "@/display/affordances/icons";
import { ToolbarButton } from "@/display/affordances/toolbar";
import { Store } from "@/display/store";

const { node } = defineProps<{ node: Node; }>();

const { services } = Store.use();
const { t } = useI18n();
const { dispatchOrToast } = useDispatch();

const exportable = computed(() => services.exportNode.exportable(node));

async function handleClick() {
  await dispatchOrToast(() => services.exportNode.export(node));
}
</script>
<template>
  <ToolbarButton
    v-if="exportable.isOk()"
    v-tooltip="{ value: t('export'), showDelay: 500 }"
    data-test="button-export"
    @click="handleClick"
  >
    <template #icon>
      <AppIcon name="file-export" />
    </template>
  </ToolbarButton>
</template>
