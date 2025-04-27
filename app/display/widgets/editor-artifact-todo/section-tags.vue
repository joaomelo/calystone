<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { ButtonBase, ChipTags, FieldSet, InputText, useI18n } from "@/utils";
import { ref } from "vue";
const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const tag = ref("");

async function handleAddTag() {
  artifact.tagger.add(tag.value);
  tag.value = "";
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleRemoveTag(tag: string) {
  artifact.tagger.remove(tag);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <FieldSet
    :legend="t('tags')"
    class="section-tags"
  >
    <div class="section-tags__input-wrapper">
      <InputText
        v-model="tag"
        :label="t('name')"
        data-test="input-tag"
        class="section-tags__input"
      />
      <ButtonBase
        :label="t('add')"
        data-test="button-add-tag"
        @click="handleAddTag"
      />
    </div>
    <ChipTags
      :labels="artifact.tagger.list()"
      data-test="artifact-tags"
      removable
      @remove="handleRemoveTag"
    />
  </FieldSet>
</template>
<style scoped>
.section-tags__input-wrapper {
  display: flex;
  align-items: end;
  gap: var(--size-2);
  margin-bottom: var(--size-2);
}

.section-tags__input {
  flex: 1;
}
</style>
