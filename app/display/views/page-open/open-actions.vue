<script setup lang="ts">
import { AppIcon } from "@/utils";

import OpenAction from "./open-action.vue";
</script>
<template>
  <div class="open-actions">
    <OpenAction
      label="page-open.actions.memory"
      data-test="open-memory"
      provider="memory"
    >
      <template #icon>
        <AppIcon name="memory" />
      </template>
    </OpenAction>
    <OpenAction
      provider="fsa"
      label="page-open.actions.fsa"
      data-test="open-fsa"
    >
      <template #icon>
        <AppIcon name="hard-drive" />
      </template>
    </OpenAction>
    <OpenAction
      label="page-open.actions.one-drive"
      data-test="open-one-drive"
      provider="oneDrive"
    >
      <template #icon>
        <AppIcon name="one-drive" />
      </template>
    </OpenAction>
    <OpenAction
      label="page-open.actions.dropbox"
      data-test="open-dropbox"
      provider="dropbox"
    >
      <template #icon>
        <AppIcon name="dropbox" />
      </template>
    </OpenAction>
  </div>
</template>
<style scoped>
.open-actions {
  display: grid;
  gap: var(--size-2);
  justify-content: center;
}
</style>