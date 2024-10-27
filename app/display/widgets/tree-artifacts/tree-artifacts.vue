<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Tree, TreeNode } from "@/utils";
import type { TreeNode as TreeNodePrime } from "primevue/treenode";

import PrimeVueTree from "primevue/tree";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<Tree<Artifact>>;
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
  <PrimeVueTree 
    selection-mode="single" 
    :value
  />
</template>