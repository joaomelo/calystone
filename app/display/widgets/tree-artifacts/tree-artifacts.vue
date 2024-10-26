<script setup lang="ts">
import { type Artifact } from "@/domain";
import { type Id, type Tree } from "@/utils";
// import PrimeVueTree from "primevue/tree";
import { computed, type MaybeRefOrGetter } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<Tree<Id, Artifact>>;
}>();

const value = computed(() => {
  return [];
});
</script>
<template>
  <!-- <PrimeVueTree 
    selection-mode="single" 
    :value="items"
  /> -->
  <pre>{{ artifacts }}</pre>
</template>