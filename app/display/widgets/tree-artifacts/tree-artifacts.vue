<script setup lang="ts">
import { type Artifact, type Id, type Tree } from "@/domain";
// import PrimeVueTree from "primevue/tree";
import { type MaybeRefOrGetter } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<Tree<Id, Artifact>>;
}>();

</script>
<template>
  <!-- <PrimeVueTree 
    selection-mode="single" 
    :value="items"
  /> -->
  <pre>{{ artifacts }}</pre>
</template>