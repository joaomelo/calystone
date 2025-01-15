<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, MasterDetail, OutlineNodes, useErrorToast } from "@/display/widgets";
import { ref } from "vue";

const toast = useErrorToast();
const store = Store.use();
const node = ref<Node | undefined>();
const detail = ref(false);

function handleSelected(id?: Id) {
  node.value = solveNode(id);
  detail.value = Boolean(node.value);
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
  <MasterDetail
    v-model="detail"
    class="page-outline"
  >
    <template #master>
      <template v-if="store.nodes !== undefined">
        <OutlineNodes
          :nodes="store.nodes"
          class="page-outline-start"
          @selected="handleSelected"
          @expanded="handleExpanded"
        />
      </template>
    </template>
    <template #detail>
      <EditorSwitcher :node />
    </template>
  </MasterDetail>
</template>
<style scoped>
.page-outline {
  height: 100vh;
}
</style>