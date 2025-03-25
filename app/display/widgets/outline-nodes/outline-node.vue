<script setup lang="ts">
import type { Node } from "@/domain";

import { solveIcon } from "./solve-icon";

defineProps<{
  node: Node
}>();
</script>
<template>
  <div
    draggable="false"
    class="outline-node"
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