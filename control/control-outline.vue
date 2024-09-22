<script setup lang="ts">
import { createArtifacts, loadHandlesOf, useStore } from "@data";
import { routeOpen } from "@display/views/open";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import PageOutline from "./page-outline.vue";

interface Props {
  parentId?: string;
}
const { parentId } = defineProps<Props>();

// vue router coerces the parentId param to an empty string when the correct value should be null or undefined
const safeParentId = computed<string | undefined>(() => {
  if (parentId === "") return undefined;
  return parentId;
});

const router = useRouter();
const store = useStore();

onMounted(async () => {
  const { rootHandle } = store;
  if (!rootHandle) return router.push(routeOpen.path);
  const entries = await createArtifacts(loadHandlesOf(rootHandle));
  entries.forEach(entry => store.artifacts.set(entry.id, entry));
});
</script>
<template>
  <PageOutline
    :artifacts="store.artifacts"
    :parent-id="safeParentId"
  />
</template>