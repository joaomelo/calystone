<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { ToolbarButton, useI18n } from "@/utils";
import { computed } from "vue";

const { node } = defineProps<{
  node: Node;
}>();

const { t } = useI18n();
const { services } = Store.use();

const shareable = computed(() => services.shareNode.shareable(node));
</script>
<template>
  <ToolbarButton
    v-if="shareable.isOk()"
    v-tooltip="{ value: t('share'), showDelay: 500 }"
    icon="bxs-share-alt"
    data-test="button-share"
  />
</template>
