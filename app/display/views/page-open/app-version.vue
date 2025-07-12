<script setup lang="ts">
import { Store } from "@/display/store";

const { appData } = Store.use();
const { version } = appData;
</script>
<template>
  <p class="app-version">
    {{ version }}
  </p>
</template>
<style scoped>
.app-version {
  max-width: 100%;
  font-size: var(--font-size-00);
  color: var(--p-text-muted-color);
  text-align: end;
}
</style>