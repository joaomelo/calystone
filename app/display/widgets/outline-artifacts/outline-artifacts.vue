<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Tree, TreeNode } from "@/utils";
import type { TreeNode as TreeNodePrime } from "primevue/treenode";

import ProgressBar from "primevue/progressbar";
import PrimeVueTree from "primevue/tree";
import { computed, toValue } from "vue";

import { ScrollPanel } from "../scroll-panel";

const { artifacts } = defineProps<{
  artifacts: Tree<Artifact>;
  isLoading: boolean;
}>();

const value = computed(() => toValue(artifacts).map(mapNode));

function mapNode(node: TreeNode<Artifact>): TreeNodePrime {
  const item = mapArtifact(node.item);
  const children = node.children.map(mapNode);
  return { ...item, children };
}

function mapArtifact(artifact: Artifact) {
  return {
    icon: artifact.type === "file" ? "pi pi-file" : "pi pi-folder",
    key: artifact.id,
    label: artifact.name,
  };
}
</script>
<template>
  <div class="outline-artifacts">
    <ProgressBar
      v-if="isLoading"
      mode="indeterminate"
    />
    <ScrollPanel class="outline-artifacts-scroll">
      <PrimeVueTree 
        selection-mode="single"
        :value
      />
    </ScrollPanel>
  </div>
</template>
<style scoped>
.outline-artifacts,
.outline-artifacts-scroll {
  /* this will contain the component between the height boundaries of its parent  */
  height: 100%;
}

.outline-artifacts :deep(.p-progressbar) {
  border-radius: 0;
  height: var(--border-size-2);
}
</style>