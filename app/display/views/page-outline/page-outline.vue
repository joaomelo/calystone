<script setup lang="ts">
import type { Node } from "@/domain";
import type { Id } from "@/domain";

import { Store } from "@/display/store";
import { EditorNode, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { ref } from "vue";

const { nodes } = Store.use();
const node = ref<Node | undefined>();

function handleSelected(id?: Id) {
  node.value = id ? nodes.get(id) : undefined;
}
</script>
<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineNodes
        :nodes="nodes"
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