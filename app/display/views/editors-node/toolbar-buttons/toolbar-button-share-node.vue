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

const shareable = computed(() => services.shareNode.shareable(node));

async function handleClick() {
  await dispatchOrToast(() => services.shareNode.share(node));
}
</script>
<template>
  <ToolbarButton
    v-if="shareable.isOk()"
    v-tooltip="{ value: t('share'), showDelay: 500 }"
    icon="bxs-share-alt"
    data-test="button-share"
    @click="handleClick"
  />
</template>
