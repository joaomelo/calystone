<script setup lang="ts">
import { computed } from "vue";

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

const reloadable = computed(() => {
  return services.reloadDirectory.reloadable(directory).isOk();
});

async function handleReloadDirectory() {
  await dispatchOrToast(() => services.reloadDirectory.reload(directory));
}
</script>
<template>
  <ToolbarButton
    v-if="reloadable"
    v-tooltip="{ value: t('reload'), showDelay: 500 }"
    data-test="button-reload-directory"
    @click="handleReloadDirectory"
  >
    <template #icon>
      <AppIcon name="reload" />
    </template>
  </ToolbarButton>
</template>
