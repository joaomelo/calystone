<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { ref } from "vue";

const store = Store.use();
const node = ref<Node | undefined>();

function handleSelected(id?: Id) {
  node.value = findAndUpdate(id);
}

function handleExpanded(id: Id) {
  findAndUpdate(id);
}

function findAndUpdate(id?: Id) {
  if (!id || !store.connected.value) return;
  const node = store.nodes.getOrThrow(id);
  store.nodes.scheduler.schedule(node, true);
  return node;
}
</script>
<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <template v-if="store.nodes !== undefined">
        <OutlineNodes
          :nodes="store.nodes"
          class="page-outline-start"
          @selected="handleSelected"
          @expanded="handleExpanded"
        />
      </template>
    </template>
    <template #end>
      <EditorSwitcher :node />
    </template>
  </SplitterPanel>
</template>
<style scoped>
.page-outline {
  height: 100vh;
}
</style>