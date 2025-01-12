<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, OutlineNodes, SplitterPanel, useErrorToast } from "@/display/widgets";
import { ref } from "vue";

const toast = useErrorToast();
const store = Store.use();
const node = ref<Node | undefined>();

function handleSelected(id?: Id) {
  node.value = solveNode(id);
  if (node.value) void triggerLoad(node.value);
}

function handleExpanded(id: Id) {
  const node = solveNode(id);
  if (node) void triggerLoad(node);
}

function solveNode(id?: Id) {
  const node = (id) ? store.nodes.get(id) : undefined;
  return node;
}

async function triggerLoad(node: Node) {
  try {
    await node.load();
  } catch (error) {
    toast(error);
  }
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