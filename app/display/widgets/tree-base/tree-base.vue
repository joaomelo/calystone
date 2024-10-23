<script setup lang="ts">
import { type Tree } from "@/lib/trees";
import PrimeVueTree from "primevue/tree";

const { items } = defineProps<{
  tree: Tree<unknown, unknown>
}>();

</script>
<template>
  <PrimeVueTree 
    selection-mode="single" 
    :value="items"
  />
</template>