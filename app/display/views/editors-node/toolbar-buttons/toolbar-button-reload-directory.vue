<script setup lang="ts">
import { computed } from "vue";

import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import {
  AppIcon,
  ToolbarButton,
  useDispatch,
  useI18n
} from "@/utils";

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
