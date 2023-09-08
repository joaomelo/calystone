<script setup>
import { ButtonBase, InputBase, useT } from "@lib";
import { useAddArtifact } from "@body";

const t = useT();
const { addArtifactTask, artifactData } = useAddArtifact();
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="artifactData.name" @submit="addArtifactTask.run" />
    <button-base @click="addArtifactTask.run" :busy="addArtifactTask.busy">
      {{ t("add") }}
    </button-base>
  </div>
</template>
<style scoped>
.artifact-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
