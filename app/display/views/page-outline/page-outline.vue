<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { ref, watch } from "vue";

const state = Store.use();
const node = ref<Node | undefined>();
const nodesList = ref<Node[]>([]);

// deep watch was the only way to trigger reactivity on the list of nodes while the nodes are being progressivly loaded
watch(
  () => {
    if (!state.connected.value || state.nodes === undefined) return [];
    return state.nodes.list();
  },
  (nodes) => {
    nodesList.value = nodes;
  },
  { deep: true, immediate: true }
);

function handleSelected(id?: Id) {
  if (!id || state.nodes === undefined) return;
  node.value = state.nodes.get(id);
  attemptSchedule(id);
}

function handleExpanded(id: Id) {
  attemptSchedule(id);
}

function attemptSchedule(id?: Id) {
  if (!id || state.nodes === undefined) return;
  const node = state.nodes.getOrThrow(id);
  state.nodes.scheduler.schedule(node, true);
}
</script>
<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <template v-if="state.nodes !== undefined">
        <OutlineNodes
          :nodes="nodesList"
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