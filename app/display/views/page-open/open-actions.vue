<script setup lang="ts">
import OpenAction from "./open-action.vue";

</script>
<template>
  <div class="open-actions">
    <OpenAction
      label="open.memory"
      data-test="open-memory"
      icon="bx bx-memory-card"
      source="memory"
    />
    <OpenAction
      label="open.google-drive"
      data-test="open-google-drive"
      icon="bx bxl-google"
      source="google-drive"
    />
    <OpenAction
      label="open.one-drive"
      data-test="open-one-drive"
      icon="bx bx-cloud"
      source="one-drive"
    />
    <OpenAction
      label="open.dropbox"
      data-test="open-dropbox"
      icon="bx bxl-dropbox"
      source="dropbox"
    />
    <OpenAction
      source="fsa"
      label="open.fsa"
      data-test="open-fsa"
      icon="bx bx-hdd"
    />
  </div>
</template>
<style scoped>
.open-actions {
  display: grid;
  gap: var(--size-2);
  justify-content: center;
}
</style>