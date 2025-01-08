<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { ref } from "vue";

const store = Store.use();
const node = ref<Node | undefined>();

function handleSelected(id?: Id) {
  node.value = triggerLoad(id);
}

function handleExpanded(id: Id) {
  triggerLoad(id);
}

function triggerLoad(id?: Id) {
  const node = (id && store.connected.value) ? store.nodes.getOrThrow(id) : undefined;
  if (node) {
    void node.load();
  }
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