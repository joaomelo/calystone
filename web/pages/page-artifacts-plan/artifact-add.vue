<script setup>
import { ButtonBase, InputBase, useT } from "@lib";
import { useAddArtifact } from "@body";

const t = useT();
const [add, payload] = useAddArtifact();
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="payload.name" @submit="add.run" />
    <button-base @click="add.run" :busy="add.busy">
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
