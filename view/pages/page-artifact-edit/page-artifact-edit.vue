<script setup>
import { FrameDashboard } from "@view/frames";
import FormEdit from "./form-edit.vue";

defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <frame-dashboard :title="artifactId">
    <form-edit :artifact-id="artifactId" />
  </frame-dashboard>
</template>
