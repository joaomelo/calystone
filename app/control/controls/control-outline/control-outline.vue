<script setup lang="ts">
import { PageOutline } from "@/display";
import { Store } from "@/domain";
import { treeify } from "@/domain/trees";
import { computed } from "vue";

const store = Store.use();
const artifacts = computed(() => treeify(store.artifacts.hash));
</script>
<template>
  <PageOutline :artifacts />
</template>