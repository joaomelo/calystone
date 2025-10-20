<script setup lang="ts">
import type { Directory } from "@/domain";

import { useDispatch } from "@/display/affordances/dispatch";
import { useI18n } from "@/display/affordances/i18n";
import { AppIcon } from "@/display/affordances/icons";
import { ToolbarButton } from "@/display/affordances/toolbar";
import { Store } from "@/display/store";

const { directory } = defineProps<{ directory: Directory; }>();

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();
const { t } = useI18n();

async function handleClick() {
  await dispatchOrToast(() => services.openDirectory.open(directory));
}
</script>
<template>
  <ToolbarButton
    v-if="!directory.isLoaded()"
    v-tooltip="{ value: t('open-directory'), showDelay: 500 }"
    data-test="button-open-directory"
    @click="handleClick"
  >
    <template #icon>
      <AppIcon name="directory-open" />
    </template>
  </ToolbarButton>
</template>
