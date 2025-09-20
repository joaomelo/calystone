<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  ButtonBase,
  ChipTags,
  InputText,
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

const currentLabels = computed(() => artifact.tagger.labels());

const unusedLabels = computed(() => {
  const globalTags = services.computeTags.compute();
  const unusedTags = globalTags.difference(artifact.tagger);
  return unusedTags.labels();
});

async function handleAddTag() {
  artifact.tagger.add(workingLabel.value);
  workingLabel.value = "";
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleRemoveTag(tag: string) {
  artifact.tagger.remove(tag);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div>
    <div class="section-tags__input-wrapper">
      <InputText
        v-model="workingLabel"
        data-test="input-tag"
        class="section-tags__input"
        :suggestions="unusedLabels"
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
