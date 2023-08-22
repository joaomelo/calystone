<script setup>
import { PageDashboard } from "../page-base";
import PlanTitle from "./plan-title.vue";
import ArtifactsList from "./artifacts-list.vue";
import ArtifactAdd from "./artifact-add.vue";

defineProps({
  programId: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <page-dashboard>
    <template #title>
      <plan-title :program-id="programId" />
    </template>
    <template #default>
      <artifact-add :program-id="programId" />
      <artifacts-list :program-id="programId" />
    </template>
  </page-dashboard>
</template>
