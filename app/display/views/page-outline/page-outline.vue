<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Id } from "@/utils";

import { EditorArtifact, OutlineArtifacts, SplitterPanel } from "@/display/widgets";
import { Store } from "@/domain";
import { treeify } from "@/utils";
import { computed, ref } from "vue";

const store = Store.use();
const artifacts = computed(() => treeify(store.artifacts.hash));
const artifact = ref<Artifact>();

function handleSelected(id?: Id) {
  const maybeArtifact = store.artifacts.hash.get(id);
  artifact.value = maybeArtifact ?? undefined;
}
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineArtifacts
        :artifacts="artifacts"
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