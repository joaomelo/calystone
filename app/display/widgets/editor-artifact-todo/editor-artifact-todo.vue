<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { debounce, InputCheck, InputDate, InputNumber, InputRichText, useI18n } from "@/utils";
import { onMounted } from "vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();
const { locale, t } = useI18n();

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
});

async function handleUpdateDueDate(due: Date | null | undefined) {
  artifact.updateDueDate(due ?? null);
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateMode(value: boolean) {
  if (value) {
    artifact.complete();
  } else {
    artifact.uncomplete();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(start: Date | null | undefined) {
  artifact.updateStartDate(start ?? null);
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
      <div class="editor-artifact-todo__row">
        <InputDate
          :label="t('dates.start')"
          data-test="input-start"
          :model-value="artifact.startDate"
          show-time
          @update:model-value="handleUpdateStartDate"
        />
        <InputDate
          :label="t('dates.due')"
          data-test="input-due"
          :model-value="artifact.dueDate"
          show-time
          @update:model-value="handleUpdateDueDate"
        />
      </div>
      <div class="editor-artifact-todo__row">
        <InputNumber
          :label="t('importance')"
          data-test="input-importance"
          :locale="locale"
          :model-value="artifact.importance"
          buttons
          size="small"
          @update:model-value="handleUpdateImportance"
        />
        <InputNumber
          :label="t('urgency')"
          data-test="input-urgency"
          :locale="locale"
          :model-value="artifact.urgency"
          buttons
          size="small"
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

.editor-artifact-todo__row {
  display: flex;
  flex-direction: row;
  gap: var(--size-3);
}
</style>
