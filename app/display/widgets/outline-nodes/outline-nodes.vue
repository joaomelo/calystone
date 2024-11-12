<script setup lang="ts">
import type { Node, Nodes } from "@/domain";
import type { Id } from "@/utils";

import { isRoot, list } from "@/domain";
import { isId, isObjectLike } from "@/utils";
import ProgressBar from "primevue/progressbar";
import PrimeVueTree from "primevue/tree";
import { computed, ref, watchEffect } from "vue";

import { ScrollPanel } from "../scroll-panel";
import { convert } from "./convert";

const { nodes } = defineProps<{
  isLoading: boolean;
  // is important to use the reactive top-most data structure here to trigger the reactivity, passing a array of root objects will not secure ui updates.
  nodes: Nodes;
}>();
const emit = defineEmits<{
  selected: [id: Id | undefined];
}>();

const value = computed(() => list(nodes)
  .filter(isRoot)
  .map((node: Node) => convert(nodes, node))
);

const selectedKey = ref(null);
watchEffect(() => {
  if (!isObjectLike(selectedKey.value)) {
    emit("selected", undefined);
    return;
  }

  const keys = Object.keys(selectedKey.value);
  if (!isId(keys[0])) {
    emit("selected", undefined);
    return;
  }

  emit("selected", keys[0]);
});
</script>
<template>
  <div class="outline-nodes">
    <ProgressBar
      v-if="isLoading"
      mode="indeterminate"
    />
    <ScrollPanel class="outline-nodes-scroll">
      <PrimeVueTree
        v-model:selectionKeys="selectedKey"
        selection-mode="single"
        :value
      />
    </ScrollPanel>
  </div>
</template>
<style scoped>
.outline-nodes,
.outline-nodes-scroll {
  /* this will contain the component between the height boundaries of its parent  */
  height: 100%;
}

.outline-nodes :deep(.p-progressbar) {
  border-radius: 0;
  height: var(--border-size-2);
}
</style>