<script setup>
import { useArtifact, createIsId } from "@body";
import { LayoutDashboard } from "@view/layouts";
import EditTitle from "./edit-title.vue";
// import EditForm from "./edit-form.vue";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});
defineEmits(["done"]);

const artifact = useArtifact(createIsId(props.artifactId));
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <edit-title :name="artifact.name" @artifacts="$emit('done')" />
    </template>
    <template #default>
      <!-- <edit-form :artifact-id="artifactId" /> -->
    </template>
  </layout-dashboard>
</template>
