<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { Directory } from "@/domain";
import { useDispatch } from "@/utils";
import { computed } from "vue";

import { solveIcon } from "./solve-icon";

const { node } = defineProps<{
  node: Node
}>();
const { nodes, service } = Store.use();

const isMoveable = computed(() => service.nodeMove.support(node));
const { dispatchOrToast } = useDispatch();
const dragFormat = "application/node-id";

async function handleDragdrop(event: DragEvent) {
  if (!event.dataTransfer) return;

  event.preventDefault();

  const id = event.dataTransfer.getData(dragFormat);
  if (id === node.id) return;
  if (!(node instanceof Directory)) return;

  await dispatchOrToast(async () => {
    const subject = nodes.getOrThrow(id);
    await service.nodeMove.move({ subject, target: node });
  });
}

function handleDragover(event: DragEvent) {
  if (!(node instanceof Directory)) return;
  if (!event.dataTransfer?.types.includes(dragFormat)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDragstart(event: DragEvent) {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData(dragFormat, node.id);
  event.dataTransfer.effectAllowed = "move";
}
</script>
<template>
  <div
    :draggable="isMoveable"
    class="outline-node"
    :data-test="`outline-node-${node.id}`"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <i :class="solveIcon(node)" />
    <p>{{ node.name }}</p>
  </div>
</template>
<style scoped>
.outline-node {
  display: flex;
  gap: var(--size-1)
}
</style>