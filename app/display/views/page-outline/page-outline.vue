<script setup lang="ts">
import type { Node } from "@/domain";
import type { Id } from "@/utils";

import { EditorNode, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { getOrThrow, useStore } from "@/domain";
import { computed, ref } from "vue";

const store = useStore();
const node = ref<Node | undefined>();
const isLoading = computed(() => store.media.status === "loading");

function handleSelected(id?: Id) {
  node.value = id ? getOrThrow(store.nodes, id) : undefined;
}
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineNodes
        :nodes="store.nodes"
        :is-loading="isLoading"
        class="page-outline-start"
        @selected="handleSelected"
      />
    </template>
    <template #end>
      <EditorNode :node />
    </template>
  </SplitterPanel>
</template>
<style scoped>
.page-outline {
  height: 100vh;
}
</style>