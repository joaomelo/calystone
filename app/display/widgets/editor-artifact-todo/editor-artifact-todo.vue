<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { debounce, InputCheck, InputRichText } from "@/utils";
import { onMounted } from "vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();

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

const handleUpdateDescription = debounce(async (text: string) => {
  artifact.updateDescription(text);
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
      <InputRichText
        label="description"
        data-test="input-description"
        lineless
        :model-value="artifact.description"
        @update:model-value="handleUpdateDescription"
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
</style>
