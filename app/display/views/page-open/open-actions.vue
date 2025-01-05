<script setup lang="ts">
import OpenAction from "./open-action.vue";

</script>
<template>
  <div class="open-actions">
    <OpenAction
      label="open.memory"
      data-test="open-memory"
      icon="bx bx-memory-card"
      service="memory"
    />
    <OpenAction
      label="open.google-drive"
      data-test="open-google-drive"
      icon="bx bxl-google"
      service="googleDrive"
    />
    <OpenAction
      label="open.one-drive"
      data-test="open-one-drive"
      icon="bx bx-cloud"
      service="oneDrive"
    />
    <OpenAction
      label="open.dropbox"
      data-test="open-dropbox"
      icon="bx bxl-dropbox"
      service="dropbox"
    />
    <OpenAction
      service="fsa"
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