<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import {
  ToolbarButton, useDispatch, useI18n
} from "@/utils";

const { node } = defineProps<{ node: Directory; }>();

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();
const { t } = useI18n();

async function handleClick() {
  await dispatchOrToast(() => services.openDirectory.open(node));
}
</script>
<template>
  <ToolbarButton
    v-if="!node.isLoaded()"
    v-tooltip="{ value: t('open-directory'), showDelay: 500 }"
    icon="bxs-folder-open"
    data-test="button-open-directory"
    @click="handleClick"
  />
</template>
