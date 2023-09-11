<script setup>
import { ButtonBase, InputBase, useT } from "@lib";
import { useAddArtifact } from "@body";

const t = useT();
const { addArtifact, artifact } = useAddArtifact();
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="artifact.name" @submit="addArtifact.run" />
    <button-base @click="addArtifact.run" :busy="addArtifact.busy">
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
