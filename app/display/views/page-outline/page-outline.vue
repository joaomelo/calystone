<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Id } from "@/utils";

import { EditorArtifact, OutlineArtifacts, SplitterPanel } from "@/display/widgets";
import { Store } from "@/domain";
import { ref } from "vue";

const store = Store.use();
const artifact = ref<Artifact>();

function handleSelected(id?: Id) {
  const maybeArtifact = store.artifacts.index.get(id);
  artifact.value = maybeArtifact ?? undefined;
}
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineArtifacts
        :artifacts="store.artifacts.roots"
        :is-loading="store.artifacts.isLoading"
        class="page-outline-start"
        @selected="handleSelected"
      />
    </template>
    <template #end>
      <EditorArtifact :artifact />
    </template>
  </SplitterPanel>
</template>
<style scoped>
.page-outline {
  height: 100vh;
}
</style>