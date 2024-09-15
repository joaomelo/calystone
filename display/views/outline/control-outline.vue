<script setup lang="ts">
import { type Artifact, useStore } from "@data";
import { computed, onMounted, ref } from "vue";

import PageOutline from "./page-outline.vue";

interface Props {
  parentId?: string;
}
const { parentId } = defineProps<Props>();

// vue router coerces the parentId param to an empty string when the correct value should be null
const safeParentId = computed<null | string>(() => {
  if (parentId === "") return null;
  if (parentId === undefined) return null;
  return parentId;
});

const store = useStore();
const artifacts = ref<Artifact[]>([]);

onMounted(async () => {
  const source = store.retrieveSource();
  await source.refresh();
  artifacts.value = source.list();
});
</script>
<template>
  <PageOutline
    :artifacts="artifacts"
    :parent-id="safeParentId"
  />
</template>