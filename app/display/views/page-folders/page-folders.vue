<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type { Id } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { OutlineItems } from "@/display/views/outline-items";
import { Directory } from "@/domain";
import {
  MasterDetail,
  useDispatch
} from "@/utils";
import { computed } from "vue";

import { useExpanded } from "./use-expanded";
import { useItems } from "./use-items";
import { useSelected } from "./use-selected";

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();

const expanded = useExpanded();
const selected = useSelected();
const items = useItems({
  expanded,
  selected
});

const selectedNode = computed(() => solveNode(selected.value));
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  selected.value = undefined;
}

async function handleExpanded(itemData: ItemData) {
  const node = solveNode(itemData.key);
  if (node instanceof Directory) {
    await dispatchOrToast(() => services.openDirectory.open(node));
  }
}

function handleSelected(itemData?: ItemData) {
  selected.value = itemData?.key;
}

function solveNode(id: Id | undefined) {
  const node = (id) ? services.retrieveNodes.get(id) : undefined;
  return node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-folders"
    >
      <template #master>
        <OutlineItems
          v-model:expanded-keys="expanded"
          data-test="page-folders__outline-items"
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
.page-folders {
  height: 100%;
}
</style>