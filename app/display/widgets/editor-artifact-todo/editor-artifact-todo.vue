<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { debounce, InputCheck, InputRichText, useI18n } from "@/utils";
import { onMounted } from "vue";

import DatesPanel from "./dates-panel.vue";
import PriorityPanel from "./priority-panel.vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

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
      <DatesPanel :artifact="artifact" />
      <PriorityPanel :artifact="artifact" />
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
  gap: var(--size-2);
}
</style>
