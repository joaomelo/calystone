<script setup lang="ts">
import { Store } from "@/display/store";
import { EditorSwitcher, FrameDashboard, OutlineNodes } from "@/display/widgets";
import { Artifact, Directory, type Id, type Node } from "@/domain";
import { MasterDetail, useDispatch } from "@/utils";
import { ref } from "vue";

const { dispatchOrToast } = useDispatch();
const { nodes, service } = Store.use();
const node = ref<Node | undefined>();
const detail = ref(false);

function handleClose() {
  detail.value = false;
  node.value = undefined;
}

function handleExpanded(id: Id) {
  const node = solveNode(id);
  if (node) void triggerOpen(node);
}

function handleSelected(id?: Id) {
  node.value = solveNode(id);
  detail.value = Boolean(node.value);
  if (node.value) void triggerOpen(node.value);
}

function solveNode(id?: Id) {
  const node = (id) ? nodes.get(id) : undefined;
  return node;
}

async function triggerOpen(node: Node) {
  if (node instanceof Directory) {
    await dispatchOrToast(() => service.directoryOpen.open(node));
  }

  if (node instanceof Artifact && node.mime.type() === "text") {
    await dispatchOrToast(() => service.artifactText.fetch(node));
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