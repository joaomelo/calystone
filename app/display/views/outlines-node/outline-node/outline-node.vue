<script setup lang="ts">
import type { Node } from "@/domain";

import { useDragAndDrop } from "./use-drag-and-drop";

const { node } = defineProps<{ node: Node, }>();

const {
  handleDragdrop,
  handleDragover,
  handleDragstart,
  moveable
} = useDragAndDrop(node);

</script>
<template>
  <div
    class="outline-node"
    :draggable="moveable.isOk()"
    data-test-type="outline-node"
    :data-test="node.id"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <slot name="icon" />
    <div class="outline-node__content">
      <p
        class="outline-node__label"
        :data-test="`outline-node-label-${node.name}`"
      >
        {{ node.name }}
      </p>
      <div class="outline-node__meta">
        <slot name="meta" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.outline-node {
  display: flex;
  gap: var(--size-1);
}

.outline-node__content {
  display: flex;
  flex-direction: column;
}
</style>