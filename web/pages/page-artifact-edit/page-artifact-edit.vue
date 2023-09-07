<script setup>
import { PageDashboard } from "../page-base";
import EditTitle from "./edit-title.vue";
// import EditForm from "./edit-form.vue";

defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <page-dashboard>
    <template #title>
      <edit-title :artifact-id="artifactId" />
    </template>
    <template #default>
      {{ artifactId }}
      <!-- <edit-form :artifact-id="artifactId" /> -->
    </template>
  </page-dashboard>
</template>
