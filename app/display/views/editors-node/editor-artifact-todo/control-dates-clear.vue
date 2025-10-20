<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { ButtonBase } from "@/display/affordances/button";
import { useI18n } from "@/display/affordances/i18n";
import { AppIcon } from "@/display/affordances/icons";
import { Store } from "@/display/store";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

async function handleClearDates() {
  artifact.clearDates();
  await services.exchangeArtifact.postFrom(artifact);
}

</script>
<template>
  <ButtonBase
    data-test="button-clear"
    :label="t('editor-todo.dates.clear')"
    severity="secondary"
    @click="handleClearDates"
  >
    <template #icon>
      <AppIcon name="delete" />
    </template>
  </ButtonBase>
</template>