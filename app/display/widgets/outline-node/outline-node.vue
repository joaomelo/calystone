<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { Artifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { useDispatch } from "@/utils";
import { computed } from "vue";

import NodeArtifact from "./node-artifact.vue";
import NodeDirectory from "./node-directory.vue";
import NodeText from "./node-text.vue";
import NodeTodo from "./node-todo.vue";

const { node } = defineProps<{
  node: Node
}>();
const { nodes, services } = Store.use();

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
    data-test-type="outline-node"
    :data-test="node.id"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <NodeDirectory
      v-if="(node instanceof Directory)"
      :directory="node"
    />
    <NodeTodo
      v-else-if="(node instanceof TodoArtifact)"
      :todo="node"
    />
    <NodeText
      v-else-if="(node instanceof TextArtifact)"
      :text="node"
    />
    <NodeArtifact
      v-else-if="(node instanceof Artifact)"
      :artifact="node"
    />
  </div>
</template>
