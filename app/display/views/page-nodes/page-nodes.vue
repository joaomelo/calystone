<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type {
  Id, Node
} from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { OutlineItems } from "@/display/views/outline-items";
import { Directory } from "@/domain";
import {
  MasterDetail, useDispatch
} from "@/utils";
import {
  computed, ref
} from "vue";

import { useItems } from "./use-items";

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();
const {
  expandedKeys, items
} = useItems();

const selectedNode = ref<Node | undefined>();
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  selectedNode.value = undefined;
}

async function handleExpanded(itemData: ItemData) {
  const node = solveNode(itemData.key);
  if (node instanceof Directory) {
    await dispatchOrToast(() => services.openDirectory.open(node));
  }
}

function handleSelected(itemData?: ItemData) {
  // selection does not trigger directory opening or artifact content fetching. selection opens the editor for the selected node. each editor is going to manage what is the best approach regarding content. maybe auto opening or offering a affordances for the user to do it at their convenience.
  selectedNode.value = solveNode(itemData?.key);
}

function solveNode(id?: Id) {
  const node = (id) ? services.retrieveNodes.get(id) : undefined;
  return node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-nodes"
    >
      <template #master>
        <OutlineItems
          v-model:expanded-keys="expandedKeys"
          data-test="page-nodes__outline-items"
          :items="items"
          mode="tree"
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
.page-nodes {
  height: 100%;
}
</style>