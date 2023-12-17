<script setup>
import { FrameDashboard } from "@view/frames";
import { useTitle } from "./use-title";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const title = useTitle(props.parentId);
</script>
<template>
  <frame-dashboard :title="title">
    <artifact-add class="page-outline-add" :parent-id="parentId" />
    <artifacts-tree :parent-id="parentId" />
  </frame-dashboard>
</template>

<style scoped>
.page-outline-add {
  margin-bottom: var(--size-25);
}
</style>
