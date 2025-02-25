<script setup lang="ts">
import { Store } from "@/display/store";
import { EditorSwitcher, FrameDashboard, MasterDetail, OutlineNodes, useErrorToast } from "@/display/widgets";
import { Directory, type Id, type Node } from "@/domain";
import { onMounted, ref } from "vue";

const toast = useErrorToast();
const { nodes, service } = Store.use();
const node = ref<Node | undefined>();
const detail = ref(false);

onMounted(() => {
  void service.opener.openRoots();
});

function handleClose() {
  detail.value = false;
  node.value = undefined;
}

function handleExpanded(id: Id) {
  const node = solveNode(id);
  if (node) void triggerLoad(node);
}

function handleSelected(id?: Id) {
  node.value = solveNode(id);
  detail.value = Boolean(node.value);
  if (node.value) void triggerLoad(node.value);
}

function solveNode(id?: Id) {
  const node = (id) ? nodes.get(id) : undefined;
  return node;
}

async function triggerLoad(node: Node) {
  try {
    if (node instanceof Directory) {
      await service.opener.openDirectory(node);
    }
  } catch (error) {
    toast(error);
  }
}

</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="detail"
      class="page-outline"
    >
      <template #master>
        <OutlineNodes
          :nodes="nodes"
          class="page-outline-start"
          @selected="handleSelected"
          @expanded="handleExpanded"
        />
      </template>
      <template #detail>
        <EditorSwitcher
          :node
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