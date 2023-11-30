<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/frames";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('page-artifacts-plan.plan')">
    <artifact-add class="page-artifacts-plan-add" />
    <artifacts-tree />
  </frame-dashboard>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-25);
}
</style>
