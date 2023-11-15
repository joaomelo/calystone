<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/frames";
// import { TextHeading } from "@view/components";
// import { LayoutDashboard } from "@view/layouts";
// import { useAddArtifact } from "./use-add-artifact";
// import ArtifactAdd from "./artifact-add.vue";
// import ArtifactsTree from "./artifacts-tree.vue";

// defineEmits(["edit", "close"]);

const { t } = useI18n();
// const artifacts = useArtifacts();
// const add = useAddArtifact();
// const delTask = useArtifactDel();
</script>
<template>
  <frame-dashboard :title="t('plan')">
    <!-- <artifact-add class="page-artifacts-plan-add" />
     <artifacts-tree
        :artifacts="artifacts"
        @edit="$emit('edit', $event)"
        @append="addTask.run({ name: '', parentId: $event })"
        @del="delTask.run"
      /> -->
  </frame-dashboard>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-10);
}
</style>
