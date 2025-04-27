<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, FrameDashboard, OutlineTags } from "@/display/widgets";
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
      class="page-tags"
    >
      <template #master>
        <OutlineTags
          :nodes="nodes"
          @selected="handleSelected"
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
.page-tags {
  height: 100%;
}
</style>