<script setup lang="ts">
// import type { ItemData } from "@/display/views/outline-item";
import type { Node } from "@/domain";

// import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { MasterDetail } from "@/utils";
import {
  computed,
  ref
} from "vue";

// const { services } = Store.use();

const selectedNode = ref<Node | undefined>();
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  resetState();
}

// function handleSelected(data?: ItemData) {
//   if (!data) {
//     resetState();
//     return;
//   }

//   const {
//     key, type
//   } = data;
//   if (type === "tag") {
//     resetState();
//     return;
//   }

//   selectedNode.value = solveNode(key);
// }

function resetState() {
  selectedNode.value = undefined;
}

// function solveNode(id: Id) {
//   const node = services.retrieveNodes.get(id);
//   return node;
// }
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-priority"
    >
      <template #master>
        priority list
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
.page-priority {
  height: 100%;
}
</style>