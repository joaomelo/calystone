<script setup>
import { LayoutDashboard } from "@view/layouts";
import { useArtifact } from "./use-artifact";
import EditTitle from "./edit-title.vue";
// import EditForm from "./edit-form.vue";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});
defineEmits(["done"]);

const artifact = useArtifact(props.artifactId);
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <edit-title :name="artifact.name" />
    </template>
    <template #default>
      <!-- <edit-form :artifact-id="artifactId" /> -->
    </template>
  </layout-dashboard>
</template>
