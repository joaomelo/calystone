<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { ChipTags, FieldSet, useI18n } from "@/utils";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

async function handleRemoveTag(tag: string) {
  artifact.tagger.remove(tag);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <FieldSet :legend="t('tags')">
    <ChipTags
      :labels="artifact.tagger.list()"
      data-test="artifact-tags"
      removable
      @remove="handleRemoveTag"
    />
  </FieldSet>
</template>
