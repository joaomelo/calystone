<script setup>
import { PageDashboard } from "../page-base";
import EditTitle from "./edit-title.vue";
import EditForm from "./edit-form.vue";

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
      <edit-title :program-id="programId" />
    </template>
    <template #default>
      <edit-form :program-id="programId" />
    </template>
  </page-dashboard>
</template>
