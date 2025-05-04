<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { debounce, InputRichText, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const handleUpdatedetails = debounce(async (text: string) => {
  artifact.details = text;
  await services.exchangeArtifact.postFrom(artifact);
}, 1000);
</script>
<template>
  <InputRichText
    :label="t('editor-todo.details')"
    data-test="input-details"
    lineless
    :model-value="artifact.details"
    @update:model-value="handleUpdatedetails"
  />
</template>
