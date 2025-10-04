<script setup lang="ts">
import {
  computed,
  ref
} from "vue";

import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  ButtonBase,
  ChipTags,
  InputText,
  useDispatch,
  useI18n
} from "@/utils";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const workingLabel = ref("");

const currentLabels = computed(() => artifact.tagsLabels);

const todos = services.spawnCollections.todos();
const suggestions = computed(() => {
  const globalTagger = todos.tagger();
  const onlyGlobalTagger = globalTagger.difference(artifact.tags);
  return onlyGlobalTagger.labels;
});

const {
  dispatch,
  errors
} = useDispatch();

async function handleAddTag() {
  await dispatch(async () => {
    artifact.addTag(workingLabel.value);
    workingLabel.value = "";
    await services.exchangeArtifact.postFrom(artifact);
  });
}

async function handleRemoveTag(tag: string) {
  await dispatch(async () => {
    artifact.removeTag(tag);
    await services.exchangeArtifact.postFrom(artifact);
  });
}
</script>
<template>
  <div>
    <div class="section-tags__input-wrapper">
      <InputText
        v-model="workingLabel"
        class="section-tags__input"
        data-test="input-tag"
        :error="errors.global"
        :suggestions="suggestions"
        @keydown.enter="handleAddTag"
      />
      <ButtonBase
        data-test="button-add-tag"
        :label="t('add')"
        @click="handleAddTag"
      />
    </div>
    <ChipTags
      data-test="chip-tags-tags"
      :labels="currentLabels"
      removable
      @remove="handleRemoveTag"
    />
  </div>
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
