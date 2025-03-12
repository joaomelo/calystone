<script setup lang="ts">
import { Store } from "@/display/store";
import { DialogRename } from "@/display/views/dialog-rename";
import { EditorSwitcher, FrameDashboard, MasterDetail, OutlineNodes, useErrorToast } from "@/display/widgets";
import { Artifact, Directory, type Id, type Node } from "@/domain";
import { ref, useTemplateRef } from "vue";

const toast = useErrorToast();
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

const dialogRename = useTemplateRef("dialogRename");
function handleRename() {
  dialogRename.value?.open();
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
  try {
    if (node instanceof Directory) {
      await service.directoryOpen.open(node);
    }

    if (node instanceof Artifact && node.mime.type() === "text") {
      await service.artifactText.fetch(node);
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
          @rename="handleRename"
        />
      </template>
    </MasterDetail>

    <DialogRename
      v-if="node"
      ref="dialogRename"
      :node="node"
    />
  </FrameDashboard>
</template>
<style scoped>
.page-outline {
  height: 100%;
}
</style>