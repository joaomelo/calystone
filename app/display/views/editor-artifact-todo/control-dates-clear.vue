<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  ButtonBase,
  useI18n
} from "@/utils";

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
    :label="t('editor-todo.dates.clear')"
    data-test="button-clear"
    icon="bx bx-trash"
    severity="secondary"
    @click="handleClearDates"
  />
</template>