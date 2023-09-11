<script setup>
import { useAuthState, AUTH_STATUSES } from "@lib";
import { PageArtifactsPlan, PageUnsolved, PageAuth } from "./pages";

const authState = useAuthState();
</script>

<template>
  <main>
    <template v-if="authState.status === AUTH_STATUSES.UNSOLVED">
      <page-unsolved />
    </template>
    <template v-if="authState.status === AUTH_STATUSES.SIGNED_OUT">
      <page-auth />
    </template>
    <template v-if="authState.status === AUTH_STATUSES.SIGNED_IN">
      <page-artifacts-plan />
    </template>
  </main>
</template>

<style scoped>
main {
  max-width: var(--size-90);
  height: 100%;
  margin: auto;
  padding-block: var(--size-20);
  padding-inline: var(--size-20);
  background-color: var(--color-neutral-70);
}
</style>
