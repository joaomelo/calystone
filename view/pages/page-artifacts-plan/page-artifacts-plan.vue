<script setup lang="ts">
// import { HeadingText } from "@view/components";
// import { LayoutDashboard } from "@view/layouts";
// import { useT } from "@view/i18n";
import { FrameBase } from "@view/frames";
// import { useAddArtifact } from "./use-add-artifact";
// import ArtifactAdd from "./artifact-add.vue";
// import ArtifactsTree from "./artifacts-tree.vue";

// defineEmits(["edit", "close"]);

// const t = useT();
// const artifacts = useArtifacts();
// const add = useAddArtifact();
// const delTask = useArtifactDel();
</script>
<template>
  <frame-base>
    plan
    <!-- <artifact-add class="page-artifacts-plan-add" @add="add.run" /> -->
    <!--  <artifacts-tree
        :artifacts="artifacts"
        @edit="$emit('edit', $event)"
        @append="addTask.run({ name: '', parentId: $event })"
        @del="delTask.run"
      /> -->
  </frame-base>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-10);
}
</style>
