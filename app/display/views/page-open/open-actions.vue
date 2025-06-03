<script setup lang="ts">
import OpenAction from "./open-action.vue";

</script>
<template>
  <div class="open-actions">
    <OpenAction
      label="page-open.actions.memory"
      data-test="open-memory"
      icon="bx bx-memory-card"
      provider="memory"
    />
    <OpenAction
      provider="fsa"
      label="page-open.actions.fsa"
      data-test="open-fsa"
      icon="bx bx-hdd"
    />
    <OpenAction
      label="page-open.actions.one-drive"
      data-test="open-one-drive"
      icon="bx bx-cloud"
      provider="oneDrive"
    />
    <OpenAction
      label="page-open.actions.dropbox"
      data-test="open-dropbox"
      icon="bx bxl-dropbox"
      provider="dropbox"
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