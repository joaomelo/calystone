<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import {
  ToolbarButton,
  useDispatch,
  useI18n
} from "@/utils";

const { directory } = defineProps<{ directory: Directory; }>();
const { dispatchOrToast } = useDispatch();
const { services } = Store.use();
const { t } = useI18n();

async function handleReloadDirectory() {
  await dispatchOrToast(() => services.reloadDirectory.reload(directory));
}
</script>
<template>
  <ToolbarButton
    v-tooltip="{ value: t('reload'), showDelay: 500 }"
    icon="bx-refresh"
    data-test="button-reload-directory"
    @click="handleReloadDirectory"
  />
</template>
