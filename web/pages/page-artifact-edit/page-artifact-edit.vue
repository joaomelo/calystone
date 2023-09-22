<script setup>
import { LayoutDashboard } from "../layout-base";
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
  <layout-dashboard>
    <template #title>
      <edit-title :artifact-id="artifactId" @done="$emit('done')" />
    </template>
    <template #default>
      <!-- <edit-form :artifact-id="artifactId" /> -->
    </template>
  </layout-dashboard>
</template>
