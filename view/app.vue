<script setup lang="ts">
import { UseCases } from "@body";
import { useT } from "@view/i18n";
import { FrameBase, FrameDashboard } from "./frames";
import { PageAuth, PageArtifactsPlan, PageArtifactEdit } from "./pages";

const t = useT();

const useCases = new UseCases([
  { value: "AUTH", text: "auth" },
  { value: "ARTIFACTS_PLAN", text: t("artifacts") },
  { value: "ARTIFACTS_EDIT", text: t("edit") },
]);
</script>

<template>
  <main>
    <template v-if="useCases.isCurrent('AUTH')">
      <frame-base>
        <page-auth @load="useCases.update('ARTIFACTS_PLAN')" />
      </frame-base>
    </template>
    <template
      v-else-if="useCases.isCurrentSome('ARTIFACTS_PLAN', 'ARTIFACT_EDIT')"
    >
      <frame-dashboard @close="useCases.update('AUTH')">
        <template v-if="useCases.isCurrent('ARTIFACTS_PLAN')">
          <page-artifacts-plan
            @edit="useCases.update('ARTIFACT_EDIT', $event)"
          />
        </template>
        <template v-else-if="useCases.isCurrent('ARTIFACT_EDIT')">
          <page-artifact-edit
            :artifact-id="useCases.context"
            @done="useCases.update('ARTIFACTS_PLAN')"
          />
        </template>
      </frame-dashboard>
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
