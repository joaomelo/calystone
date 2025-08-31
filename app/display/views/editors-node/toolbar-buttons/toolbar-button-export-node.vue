<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import {
  ToolbarButton,
  useDispatch,
  useI18n
} from "@/utils";
import { computed } from "vue";

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
    icon="bxs-file-export"
    data-test="button-export"
    @click="handleClick"
  />
</template>
