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
defineEmits(["done"]);
</script>
<template>
  <page-dashboard>
    <template #title>
      <edit-title :artifact-id="artifactId" @done="$emit('done')" />
    </template>
    <template #default>
      <!-- <edit-form :artifact-id="artifactId" /> -->
    </template>
  </page-dashboard>
</template>
