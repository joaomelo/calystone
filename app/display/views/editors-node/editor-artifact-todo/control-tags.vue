<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  ButtonBase,
  ChipTags,
  InputText,
  useDispatch,
  useI18n
} from "@/utils";
import {
  computed,
  ref
} from "vue";

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
        data-test="input-tag"
        class="section-tags__input"
        :suggestions="suggestions"
        :error="errors.global"
        @keydown.enter="handleAddTag"
      />
      <ButtonBase
        :label="t('add')"
        data-test="button-add-tag"
        @click="handleAddTag"
      />
    </div>
    <ChipTags
      :labels="currentLabels"
      data-test="chip-tags-tags"
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
