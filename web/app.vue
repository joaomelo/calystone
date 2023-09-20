<script setup>
import { reactive } from "vue";
import { PageOpenFile } from "./pages";

const useCase = reactive({ name: "openFile", context: null });
const updateCase = (name, context = null) => {
  useCase.name = name;
  useCase.context = context;
};
</script>

<template>
  <main>
    <template v-if="useCase.name === 'openFile'">
      <page-open-file @edit="updateCase('artifactEdit', $event)" />
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
