<script setup lang="ts">
import type { Node } from "@/domain";

import { Status, ToolbarButton, useI18n } from "@/utils";
defineProps<{
  node: Node;
}>();

const { t } = useI18n();
// const { services } = Store.use();

// const shareable = computed(() => services.share.shareableOn(node));
const shareable = Status.ok(true);
</script>
<template>
  <ToolbarButton
    v-if="shareable.isOk()"
    v-tooltip="{ value: t('share'), showDelay: 500 }"
    icon="bxs-share-alt"
    data-test="button-share"
  />
</template>
