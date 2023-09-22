<script setup>
import { reactive } from "vue";
import { PageLoad, PageArtifactsPlan } from "./pages";

const useCase = reactive({ name: "loadDb", context: null });
const updateCase = (name, context = null) => {
  useCase.name = name;
  useCase.context = context;
};
</script>

<template>
  <main>
    <template v-if="useCase.name === 'loadDb'">
      <page-load @load="updateCase('artifactsPlan')" />
    </template>
    <template v-if="useCase.name === 'artifactsPlan'">
      <page-artifacts-plan @close="updateCase('loadDb')" />
    </template>
  </main>
</template>
<style scoped>
main {
  max-width: var(--size-90);
  min-height: 100vh;
  margin: auto;

  padding-block: var(--size-10);
  padding-inline: var(--size-20);

  background-color: var(--color-neutral-70);

  /* been a flex control make it easy to children page elements to fill the available height */
  display: flex;
  flex-direction: column;
}
</style>
