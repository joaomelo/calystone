<script setup lang="ts">
import { computed } from "vue";

import type { Node } from "@/domain";

import { Store } from "@/display/store";
import {
  AppIcon,
  ToolbarButton,
  useDispatch,
  useI18n
} from "@/utils";

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
