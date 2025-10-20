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

const shareable = computed(() => services.shareNode.shareable(node));

async function handleClick() {
  await dispatchOrToast(() => services.shareNode.share(node));
}
</script>
<template>
  <ToolbarButton
    v-if="shareable.isOk()"
    v-tooltip="{ value: t('share'), showDelay: 500 }"
    data-test="button-share"
    @click="handleClick"
  >
    <template #icon>
      <AppIcon name="share" />
    </template>
  </ToolbarButton>
</template>
