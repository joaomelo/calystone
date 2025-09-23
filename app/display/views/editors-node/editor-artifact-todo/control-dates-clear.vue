<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  AppIcon,
  ButtonBase,
  useI18n
} from "@/utils";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

async function handleClearDates() {
  artifact.scheduler.clearDates();
  await services.exchangeArtifact.postFrom(artifact);
}

</script>
<template>
  <ButtonBase
    :label="t('editor-todo.dates.clear')"
    data-test="button-clear"
    severity="secondary"
    @click="handleClearDates"
  >
    <template #icon>
      <AppIcon name="delete" />
    </template>
  </ButtonBase>
</template>