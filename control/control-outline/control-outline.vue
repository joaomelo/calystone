<script setup lang="ts">
import { useStore } from "@data";
import { PageOutline } from "@display";
import { computed } from "vue";

const { parentId } = defineProps<{
  parentId?: string;
}>();

const store = useStore();

// vue router coerces the parentId param to an empty string when the correct value should be null or undefined
const safeParentId = computed<string | undefined>(() => {
  if (parentId === "") return undefined;
  return parentId;
});
</script>
<template>
  <PageOutline
    :artifacts="store.artifacts"
    :parent-id="safeParentId"
  />
</template>