<script setup lang="ts">
import { UseCases } from "@body";
import { LayoutBase, LayoutDashboard } from "./layouts";
import { PageLoad, PageArtifactsPlan, PageArtifactEdit } from "./pages";

const useCases = new UseCases();
</script>

<template>
  <main>
    <template v-if="useCases.is('AUTH')">
      <layout-base>
        <page-load @load="useCases.update('ARTIFACTS_PLAN')" />
      </layout-base>
    </template>
    <template v-else-if="useCases.is('ARTIFACTS_PLAN')">
      <page-artifacts-plan
        @close="useCases.update('AUTH')"
        @edit="useCases.update('ARTIFACT_EDIT', $event)"
      />
    </template>
    <template v-else-if="useCases.is('ARTIFACT_EDIT')">
      <page-artifact-edit
        :artifact-id="useCases.context"
        @close="useCases.update('AUTH')"
        @done="useCases.update('ARTIFACTS_PLAN')"
      />
    </template>
    <template v-else>loading</template>
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
