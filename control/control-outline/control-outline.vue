<script setup lang="ts">
import { createArtifacts, loadHandlesOf, useStore } from "@data";
import { PageOutline } from "@display";
import { computed, onMounted } from "vue";

const { parentId } = defineProps<{
  parentId?: string;
}>();

const store = useStore();

// vue router coerces the parentId param to an empty string when the correct value should be null or undefined
const safeParentId = computed<string | undefined>(() => {
  if (parentId === "") return undefined;
  return parentId;
});

onMounted(async () => {
  const { root } = store;
  if (!root.value) return;
  const entries = await createArtifacts(loadHandlesOf(root.value));
  entries.forEach(entry => store.artifacts.set(entry.id, entry));
});
</script>
<template>
  <PageOutline
    :artifacts="store.artifacts"
    :parent-id="safeParentId"
  />
</template>