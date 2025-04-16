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
const { nodes, services } = Store.use();

const icon = computed(() => solveIcon(node));

const moveable = computed(() => services.nodeMove.moveable(node));
const { dispatchOrToast } = useDispatch();
const dragFormat = "application/node-id";

async function handleDragdrop(event: DragEvent) {
  if (!event.dataTransfer) return;

  event.preventDefault();

  const id = event.dataTransfer.getData(dragFormat);
  const target = node;
  if (!(target instanceof Directory)) return;

  await dispatchOrToast(async () => {
    const subject = nodes.getOrThrow(id);
    const moveable = subject.moveable(target);
    if (moveable.isFail()) return;
    await services.nodeMove.move({ subject, target });
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
    :draggable="moveable.isOk()"
    class="outline-node"
    data-test-type="outline-node"
    :data-test="node.id"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <i :class="icon" />
    <p>{{ node.name }}</p>
  </div>
</template>
<style scoped>
.outline-node {
  display: flex;
  gap: var(--size-1)
}
</style>