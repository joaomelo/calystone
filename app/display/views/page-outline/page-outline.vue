<script setup lang="ts">
import type { Node } from "@/domain";
import type { Id } from "@/domain";

import { EditorNode, OutlineNodes, SplitterPanel } from "@/display/widgets";
import { useNodes } from "@/domain";
import { ref } from "vue";

const nodes = useNodes();
const node = ref<Node | undefined>();

function handleSelected(id?: Id) {
  node.value = id ? nodes.value.get(id) : undefined;
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