<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { OutlineItem } from "@/display/views/outline-item";
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

const expandedKeys = useExpanded();
const selectedKeys = useSelected();
const items = useItems(expandedKeys);

const maybeEditorNode = computed(() => {
  const [first] = Object.keys(selectedKeys.value);
  return services.retrieveNodes.get(first);
});

const showDetail = computed(() => Boolean(maybeEditorNode.value));

function handleClose() {
  selectedKeys.value = {};
}

async function handleExpanded(itemData: ItemData) {
  const node = services.retrieveNodes.get(itemData.key);
  if (node instanceof Directory) {
    await dispatchOrToast(() => services.openDirectory.open(node));
  }
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
          v-model:expanded-keys="expandedKeys"
          v-model:selected-keys="selectedKeys"
          data-test="page-folders__outline-items"
          :items="items"
          display-mode="tree"
          @expanded="handleExpanded"
        >
          <template #default="{ itemData }">
            <OutlineItem :data="itemData" />
          </template>
        </OutlineItems>
      </template>
      <template #detail>
        <EditorSwitcher
          :node="maybeEditorNode"
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