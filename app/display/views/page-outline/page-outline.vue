<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, FrameDashboard, OutlineNodes } from "@/display/widgets";
import { Directory } from "@/domain";
import { MasterDetail, useDispatch } from "@/utils";
import { ref } from "vue";

const { dispatchOrToast } = useDispatch();
const { nodes, services } = Store.use();

const selectedNode = ref<Node | undefined>();
const showDetail = ref(false);

function handleClose() {
  showDetail.value = false;
  selectedNode.value = undefined;
}

async function handleExpanded(id: Id) {
  const node = solveNode(id);
  if (node instanceof Directory) {
    await dispatchOrToast(() => services.directoryOpen.open(node));
  }
}

function handleSelected(id?: Id) {
  // selection does not trigger directory opening or artifact content fetching. selection opens the editor for the selected node. each editor is going to manage what is the best approach regarding content. maybe auto opening or offering a affordances for the user to do it at their convenience.
  selectedNode.value = solveNode(id);
  showDetail.value = Boolean(selectedNode.value);
}

function solveNode(id?: Id) {
  const node = (id) ? nodes.get(id) : undefined;
  return node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-outline"
    >
      <template #master>
        <OutlineNodes
          :nodes="nodes"
          @selected="handleSelected"
          @expanded="handleExpanded"
        />
      </template>
      <template #detail>
        <EditorSwitcher
          :node="selectedNode"
          @close="handleClose"
        />
      </template>
    </MasterDetail>
  </FrameDashboard>
</template>
<style scoped>
.page-outline {
  height: 100%;
}
</style>