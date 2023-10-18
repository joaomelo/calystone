<script setup lang="ts">
// import { useArtifacts, useArtifactAdd, useArtifactDel } from "@body";
// import { HeadingText } from "@view/components";
// import { useT } from "@view/i18n";
// import { LayoutDashboard } from "@view/layouts";
// import ArtifactAdd from "./artifact-add.vue";
// import ArtifactsTree from "./artifacts-tree.vue";

// defineEmits(["edit", "close"]);

// const t = useT();
// const artifacts = useArtifacts();
// const addTask = useArtifactAdd();
// const delTask = useArtifactDel();
</script>
<template>
  <div>
    plan
    <!-- <artifact-add class="page-artifacts-plan-add" @add="addTask.run" />
      <artifacts-tree
        :artifacts="artifacts"
        @edit="$emit('edit', $event)"
        @append="addTask.run({ name: '', parentId: $event })"
        @del="delTask.run"
      /> -->
  </div>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-10);
}
</style>
