<script setup lang="ts">
import {
  IconDropbox,
  IconHardDrive,
  IconMemory,
  IconOneDrive
} from "@/utils";

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
        <IconMemory />
      </template>
    </OpenAction>
    <OpenAction
      provider="fsa"
      label="page-open.actions.fsa"
      data-test="open-fsa"
    >
      <template #icon>
        <IconHardDrive />
      </template>
    </OpenAction>
    <OpenAction
      label="page-open.actions.one-drive"
      data-test="open-one-drive"
      provider="oneDrive"
    >
      <template #icon>
        <IconOneDrive />
      </template>
    </OpenAction>
    <OpenAction
      label="page-open.actions.dropbox"
      data-test="open-dropbox"
      provider="dropbox"
    >
      <template #icon>
        <IconDropbox />
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