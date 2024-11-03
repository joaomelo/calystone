<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Id } from "@/utils";

import { EditorArtifact, OutlineArtifacts, SplitterPanel } from "@/display/widgets";
import { useStore } from "@/domain";
import { computed, ref } from "vue";

const store = useStore();
const artifact = ref<Artifact | undefined>();
const isLoading = computed(() => store.source.status === "loading");

function handleSelected(id?: Id) {
  artifact.value = id ? store.artifacts.get(id) : undefined;
}
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineArtifacts
        :artifacts="store.artifacts"
        :is-loading="isLoading"
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