<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { debounce, InputCheck, InputNumber, InputRichText, useI18n } from "@/utils";
import { onMounted } from "vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
});

async function handleUpdateMode(value: boolean) {
  if (value) {
    artifact.complete();
  } else {
    artifact.uncomplete();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

const handleUpdateUrgency = debounce(async (urgency?: number) => {
  artifact.updateUrgency(urgency);
  await services.exchangeArtifact.postFrom(artifact);
}, 200);

const handleUpdateImportance = debounce(async (importance?: number) => {
  artifact.updateImportance(importance);
  await services.exchangeArtifact.postFrom(artifact);
}, 200);

const handleUpdatedetails = debounce(async (text: string) => {
  artifact.updateDetails(text);
  await services.exchangeArtifact.postFrom(artifact);
}, 1000);
</script>
<template>
  <EditorNodeWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
  >
    <div class="editor-artifact-todo__inputs-wrapper">
      <InputCheck
        :model-value="artifact.completed()"
        :label="artifact.basename()"
        data-test="input-mode"
        @update:model-value="handleUpdateMode"
      />
      <div class="editor-artifact-todo__priority-inputs-wrapper">
        <InputNumber
          :label="t('importance')"
          data-test="input-importance"
          :locale="locale"
          :model-value="artifact.importance"
          buttons
          @update:model-value="handleUpdateImportance"
        />
        <InputNumber
          :label="t('urgency')"
          data-test="input-urgency"
          :locale="locale"
          :model-value="artifact.urgency"
          buttons
          @update:model-value="handleUpdateUrgency"
        />
      </div>
      <InputRichText
        :label="t('details')"
        data-test="input-details"
        lineless
        :model-value="artifact.details"
        @update:model-value="handleUpdatedetails"
      />
    </div>
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
<style scoped>
.editor-artifact-todo__inputs-wrapper {
  padding-block: var(--size-3);
  padding-inline: var(--size-2);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}

.editor-artifact-todo__priority-inputs-wrapper {
  display: flex;
  flex-direction: row;
  gap: var(--size-3);
}
</style>
