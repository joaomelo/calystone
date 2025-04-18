<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { onMounted, ref } from "vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();

const data = ref(artifact.content);

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
  data.value = artifact.content;
});
</script>
<template>
  <EditorNodeWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
  >
    <pre>{{ data }}</pre>
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
