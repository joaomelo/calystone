<script setup lang="ts">
import { AppIcon } from "@/display/affordances/icons";

import OpenAction from "./open-action.vue";
</script>
<template>
  <div class="open-actions">
    <OpenAction
      data-test="open-memory"
      label="page-open.actions.memory"
      provider="memory"
    >
      <template #icon>
        <AppIcon name="memory" />
      </template>
    </OpenAction>
    <OpenAction
      data-test="open-fsa"
      label="page-open.actions.fsa"
      provider="fsa"
    >
      <template #icon>
        <AppIcon name="hard-drive" />
      </template>
    </OpenAction>
    <OpenAction
      data-test="open-one-drive"
      label="page-open.actions.one-drive"
      provider="oneDrive"
    >
      <template #icon>
        <AppIcon name="one-drive" />
      </template>
    </OpenAction>
    <OpenAction
      data-test="open-dropbox"
      label="page-open.actions.dropbox"
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