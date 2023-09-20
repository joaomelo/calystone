<script setup>
import { reactive } from "vue";
import { PageLoad } from "./pages";

const useCase = reactive({ name: "openFile", context: null });
const updateCase = (name, context = null) => {
  useCase.name = name;
  useCase.context = context;
};
</script>

<template>
  <main>
    <template v-if="useCase.name === 'openFile'">
      <page-load @edit="updateCase('artifactEdit', $event)" />
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
